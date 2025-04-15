import { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'ro', label: 'Română' },
  { code: 'ja', label: '日本語' },
];

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [job, setJob] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, job, about })
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Head>
        <title>CoverLetterGenie</title>
      </Head>
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">CoverLetterGenie</h1>
        <p className="text-center">Generate a cover letter in minutes.</p>

        <Select value={language} onValueChange={setLanguage}>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          placeholder="Job title or job description"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />

        <Input
          placeholder="About you (e.g. your experience)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <Button onClick={handleCheckout} disabled={loading} className="w-full">
          {loading ? 'Redirecting...' : 'Pay & Generate ($3.99)'}
        </Button>
      </div>
    </div>
  );
}
