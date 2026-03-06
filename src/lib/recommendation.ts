import type { UserProfile } from './types';
import { mockCompanies } from './companies';

export function getRecommendations(user: UserProfile) {
  const userIndustry = user.industry;
  const userLocation = user.location.toLowerCase();
  const userSkills = user.skills.toLowerCase();
  const userEducation = user.education.toLowerCase();

  return mockCompanies
    .map((company) => {
      let score = 0;

      // Industry match (highest weight)
      if (company.industry === userIndustry) {
        score += 40;
      } else {
        score += 10; // Partial for other industries
      }

      // Location match (check if user's location appears in company location)
      const companyLocation = company.location.toLowerCase();
      if (
        userLocation.includes(companyLocation.split(',')[0]) ||
        companyLocation.includes(userLocation.split(',')[0]) ||
        userLocation.includes(companyLocation.split(' ')[0])
      ) {
        score += 25;
      } else {
        // Same state or region - simplified check
        const states = ['maharashtra', 'tamil nadu', 'gujarat', 'karnataka', 'telangana', 'delhi', 'west bengal'];
        const userInState = states.some((s) => userLocation.includes(s));
        const companyInState = states.some((s) => companyLocation.includes(s));
        if (userInState && companyInState) score += 10;
      }

      // Skills match
      const requiredSkills = company.skillsRequired.join(' ').toLowerCase();
      const matchedSkills = company.skillsRequired.filter((skill) =>
        userSkills.includes(skill.toLowerCase()) || userEducation.includes(skill.toLowerCase())
      );
      score += Math.min(matchedSkills.length * 8, 20);

      // Education level (12th pass gets bonus for some roles)
      if (company.skillsRequired.some((s) => s.includes('12th')) && userEducation.includes('12')) {
        score += 15;
      } else if (company.skillsRequired.some((s) => s.includes('10th')) && userEducation.includes('10')) {
        score += 15;
      }

      return { ...company, matchScore: Math.min(score, 100) };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}
