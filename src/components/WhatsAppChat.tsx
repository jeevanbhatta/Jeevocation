'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useChat } from '@/context/ChatContext';
import { getRecommendations } from '@/lib/recommendation';
import type { UserProfile, Industry } from '@/lib/types';

type ChatStep = 'welcome' | 'name' | 'age' | 'location' | 'education' | 'industry' | 'skills' | 'done' | 'matches';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INDUSTRY_OPTIONS: { value: Industry; label: Record<string, string> }[] = [
  { value: 'auto', label: { en: 'Auto & Components', hi: 'ऑटो', ta: 'ஆட்டோ', te: 'ఆటో', mr: 'ऑटो', bn: 'অটো', gu: 'ઓટો' } },
  { value: 'construction', label: { en: 'Construction', hi: 'निर्माण', ta: 'கட்டுமானம்', te: 'నిర్మాణం', mr: 'बांधकाम', bn: 'নির্মাণ', gu: 'બાંધકામ' } },
  { value: 'textiles', label: { en: 'Textiles', hi: 'टेक्सटाइल', ta: 'துணி', te: 'టెక్స్టైల్స్', mr: 'टेक्सटाइल', bn: 'টেক্সটাইল', gu: 'ટેક્સટાઇલ' } },
  { value: 'transport', label: { en: 'Transport & Logistics', hi: 'परिवहन', ta: 'போக்குவரத்து', te: 'రవాణా', mr: 'वाहतूक', bn: 'পরিবহন', gu: 'પરિવહન' } },
  { value: 'retail', label: { en: 'Retail', hi: 'खुदरा', ta: 'சில்லறை', te: 'రిటైల్', mr: 'किरकोळ', bn: 'খুচরা', gu: 'રિટેલ' } },
  { value: 'healthcare', label: { en: 'Healthcare', hi: 'स्वास्थ्य', ta: 'சுகாதாரம்', te: 'ఆరోగ్యం', mr: 'आरोग्य', bn: 'স্বাস্থ্য', gu: 'આરોગ્ય' } },
];

export default function WhatsAppChat() {
  const { t, language } = useLanguage();
  const { isChatOpen: isOpen, toggleChat: setIsOpen } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<ChatStep>('welcome');
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [matches, setMatches] = useState<ReturnType<typeof getRecommendations>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: '0',
        text: t('chatWelcome'),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      setStep('name');
    }
  }, [isOpen, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender, timestamp: new Date() },
    ]);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    addMessage(text, 'user');
    setInput('');

    if (step === 'name') {
      setUserProfile((p) => ({ ...p, name: text }));
      setTimeout(() => {
        addMessage(t('chatAge'), 'bot');
        setStep('age');
      }, 800);
    } else if (step === 'age') {
      const age = parseInt(text, 10);
      if (!isNaN(age) && age >= 20 && age <= 24) {
        setUserProfile((p) => ({ ...p, age }));
        setTimeout(() => {
          addMessage(t('chatLocation'), 'bot');
          setStep('location');
        }, 800);
      } else {
        setTimeout(() => {
          addMessage(t('chatAge'), 'bot');
        }, 800);
      }
    } else if (step === 'location') {
      setUserProfile((p) => ({ ...p, location: text }));
      setTimeout(() => {
        addMessage(t('chatEducation'), 'bot');
        setStep('education');
      }, 800);
    } else if (step === 'education') {
      setUserProfile((p) => ({ ...p, education: text }));
      setTimeout(() => {
        const industryText = INDUSTRY_OPTIONS.map((o) => o.label[language] || o.label.en).join(', ');
        addMessage(`${t('chatIndustry')} (${industryText})`, 'bot');
        setStep('industry');
      }, 800);
    } else if (step === 'industry') {
      const industryMatch = INDUSTRY_OPTIONS.find(
        (o) =>
          text.toLowerCase().includes(o.value) ||
          (o.label[language] || o.label.en).toLowerCase().includes(text.toLowerCase())
      );
      const industry = industryMatch?.value ?? 'auto';
      setUserProfile((p) => ({ ...p, industry }));
      setTimeout(() => {
        addMessage(t('chatSkills'), 'bot');
        setStep('skills');
      }, 800);
    } else if (step === 'skills') {
      setUserProfile((p) => ({ ...p, skills: text }));
      addMessage(t('chatThanks'), 'bot');
      setTimeout(() => {
        const profile = { ...userProfile, skills: text } as UserProfile;
        const recs = getRecommendations(profile);
        setMatches(recs);
        addMessage(t('chatMatchIntro'), 'bot');
        setStep('matches');
      }, 1500);
    }
  };

  const industryLabel = (ind: string) => {
    const opt = INDUSTRY_OPTIONS.find((o) => o.value === ind);
    return opt?.label[language] || opt?.label.en || ind;
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen()}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105 hover:shadow-xl"
        aria-label={isOpen ? t('closeChat') : t('openChat')}
      >
        <svg
          className="h-7 w-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          )}
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{t('appName')}</p>
              <p className="text-xs text-white/80">Online • {t('chatWithUs')}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#E5DDD5] p-4" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4c4b0\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 shadow ${
                    msg.sender === 'user'
                      ? 'bg-[#DCF8C6] text-gray-900'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {step === 'matches' && matches.length > 0 && (
              <div className="space-y-2">
                {matches.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg bg-white p-3 shadow"
                  >
                    <p className="font-semibold text-[#075E54]">{m.companyName}</p>
                    <p className="text-sm text-gray-600">{m.role}</p>
                    <p className="text-xs text-gray-500">{m.location} • {industryLabel(m.industry)}</p>
                    <p className="mt-1 text-xs font-medium text-green-600">
                      {m.salaryRange} • {m.duration}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">{m.description}</p>
                    <span className="mt-2 inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      {m.matchScore}% match
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {step !== 'matches' && (
            <div className="flex gap-2 border-t border-gray-200 bg-white p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t('chatPlaceholder')}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#25D366] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
              />
              <button
                onClick={sendMessage}
                className="rounded-lg bg-[#25D366] px-4 py-2 text-white transition hover:bg-[#20BD5A]"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
