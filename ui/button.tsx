import { ButtonHTMLAttributes } from 'react';

export default function Button({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        [
          'w-fit rounded-md px-4 py-2 font-semibold transition-colors',
          // Improve contrast: accent on light backgrounds; allow override via className
          'bg-accent text-white hover:bg-accent/90',
          className,
        ]
          .filter(Boolean)
          .join(' ')
      }
      {...props}
    >
      {children}
    </button>
  );
}
