import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  return (
    <div style={{ padding: '2rem' }}>
      <h1>CoverLetterGenie</h1>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
