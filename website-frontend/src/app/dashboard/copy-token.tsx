'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CopyTokenProps {
  token: string;
}

export function CopyToken({ token }: CopyTokenProps) {
  const [copied, setCopied] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={handleCopy} variant={copied ? 'default' : 'outline'}>
          {copied ? '✓ Copied!' : 'Copy Token'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setShowToken(!showToken)}>
          {showToken ? 'Hide' : 'Show'} Token
        </Button>
      </div>
      {showToken && (
        <div className="bg-muted p-3 rounded-md">
          <code className="text-xs break-all select-all">{token}</code>
        </div>
      )}
    </div>
  );
}
