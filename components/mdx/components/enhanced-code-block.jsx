'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  dracula,
  materialDark,
  materialLight,
  nightOwl,
  nord,
  tomorrow,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

/**
 * Enhanced code block component with syntax highlighting and copy button
 */
export default function EnhancedCodeBlock({ children, className }) {
  const [isCopied, setIsCopied] = useState(false);

  // Detect language from the className (format: language-xxx)
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  // Get code content
  const code = children?.trim() || '';

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Choose style based on language or use tomorrow as default
  const getStyle = () => {
    // You can map specific languages to specific styles
    const styleMap = {
      js: tomorrow,
      jsx: tomorrow,
      ts: tomorrow,
      tsx: tomorrow,
      css: vscDarkPlus,
      scss: vscDarkPlus,
      html: materialLight,
      java: nightOwl,
      python: dracula,
      rust: materialDark,
      go: nord,
      text: tomorrow, // Add explicit style for plaintext
      // Add more language-style mappings as needed
    };

    return styleMap[language] || tomorrow; // Default to tomorrow style
  };

  return (
    <div className="group relative my-6 md:my-8">
      {/* Copy button that shows on hover */}
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 z-10 rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-gray-600"
        aria-label={isCopied ? 'Copied!' : 'Copy code'}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>

      {/* Language badge */}
      {language !== 'text' && (
        <div className="absolute top-0 left-4 z-10 -mt-3 rounded-sm bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
          {language}
        </div>
      )}

      {/* Code block with syntax highlighting */}
      <SyntaxHighlighter
        language={language}
        style={getStyle()}
        showLineNumbers
        wrapLines
        wrapLongLines
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          padding: '1.5rem',
          backgroundColor: '#1a1a1a', // Dark background for all code blocks
          color: '#ffffff', // Light text for all code blocks
        }}
        codeTagProps={{
          className: 'font-mono',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
