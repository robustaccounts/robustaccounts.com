import React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const Close = ({ className, ...props }: Props) => {
    return (
        <svg
            height="24px"
            width="24px"
            fill="#e3e3e3"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            className={cn(className)}
        >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
};

export default Close;
