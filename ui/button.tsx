import { ButtonHTMLAttributes } from 'react';

export default function Button({
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className="w-fit rounded-md bg-secondary px-4 py-2 text-white"
            {...props}
        >
            {children}
        </button>
    );
}
