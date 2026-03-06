import type { CompanyPosting, UserProfile } from './types';

// Mock candidates (simulating users who signed up via chatbot)
export const mockCandidates: UserProfile[] = [
  { name: 'Rahul Kumar', age: 22, location: 'Pune, Maharashtra', education: '10th pass, ITI enrolled', industry: 'auto', skills: 'basic mechanics, interested in vehicles' },
  { name: 'Priya S', age: 21, location: 'Chennai, Tamil Nadu', education: '12th pass', industry: 'construction', skills: 'physical fitness, teamwork' },
  { name: 'Vikram M', age: 23, location: 'Surat, Gujarat', education: '10th pass', industry: 'textiles', skills: 'attention to detail' },
  { name: 'Anita R', age: 20, location: 'Bangalore, Karnataka', education: '12th pass', industry: 'transport', skills: 'basic computer, organized' },
  { name: 'Suresh P', age: 24, location: 'Hyderabad, Telangana', education: '10th pass', industry: 'retail', skills: 'customer service, communication' },
  { name: 'Kavita D', age: 21, location: 'Mumbai, Maharashtra', education: '12th pass, nursing course', industry: 'healthcare', skills: 'empathy, basic science' },
  { name: 'Arjun T', age: 22, location: 'Delhi NCR', education: '10th pass', industry: 'auto', skills: 'interested in electric vehicles' },
  { name: 'Deepa K', age: 23, location: 'Kolkata, West Bengal', education: 'ITI electrical', industry: 'construction', skills: 'basic electrical, safety awareness' },
];

// Match candidates to a company posting (reverse of user recommendation)
export function getCandidatesForPosting(posting: CompanyPosting): (UserProfile & { matchScore: number })[] {
  return mockCandidates
    .map((candidate) => {
      let score = 0;

      if (candidate.industry === posting.industry) score += 40;
      else score += 10;

      const postingLoc = posting.location.toLowerCase();
      const candidateLoc = candidate.location.toLowerCase();
      if (
        candidateLoc.includes(postingLoc.split(',')[0]) ||
        postingLoc.includes(candidateLoc.split(',')[0])
      ) {
        score += 25;
      } else {
        const states = ['maharashtra', 'tamil nadu', 'gujarat', 'karnataka', 'telangana', 'delhi', 'west bengal'];
        if (states.some((s) => candidateLoc.includes(s)) && states.some((s) => postingLoc.includes(s))) score += 10;
      }

      const candidateSkills = (candidate.skills + ' ' + candidate.education).toLowerCase();
      const matched = posting.skillsRequired.filter(
        (s) => candidateSkills.includes(s.toLowerCase())
      );
      score += Math.min(matched.length * 8, 20);

      if (posting.skillsRequired.some((s) => s.includes('12th')) && candidate.education.includes('12')) score += 15;
      else if (posting.skillsRequired.some((s) => s.includes('10th')) && candidate.education.includes('10')) score += 15;

      return { ...candidate, matchScore: Math.min(score, 100) };
    })
    .filter((c) => c.matchScore >= 30)
    .sort((a, b) => b.matchScore - a.matchScore);
}
