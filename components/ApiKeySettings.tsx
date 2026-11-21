import React, { useState } from 'react';
import { clearApiKey, getApiKey, hasStoredKey, setApiKey } from '../services/apiKey';

const ApiKeySettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [configured, setConfigured] = useState(() => !!getApiKey());

  const save = () => {
    if (!value.trim()) return;
    setApiKey(value);
    setValue('');
    setConfigured(true);
    setOpen(false);
  };

  const remove = () => {
    clearApiKey();
    setConfigured(!!getApiKey());
    setOpen(false);
  };

  return (
    <div className="w-full max-w-2xl mb-4 flex flex-col items-end">
      <button
        onClick={() => setOpen(o => !o)}
        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
          configured
            ? 'border-slate-700 text-slate-400 hover:text-slate-200'
            : 'border-amber-500/60 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20'
        }`}
      >
        🔑 {configured ? 'API key set' : 'Add Gemini API key'}
      </button>
      {open && (
        <div className="mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm space-y-3">
          <p className="text-slate-400">
            Paste a free key from{' '}
            <a className="text-cyan-400 underline" href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">
              Google AI Studio
            </a>
            . It is stored only in this browser and sent only to Google.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && save()}
              placeholder="AIza..."
              autoComplete="off"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-600"
            />
            <button onClick={save} disabled={!value.trim()} className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white">
              Save
            </button>
            {hasStoredKey() && (
              <button onClick={remove} className="px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white">
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeySettings;
