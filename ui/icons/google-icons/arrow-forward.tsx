import React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const ArrowForward = ({ className, ...props }: Props) => {
    return (
        <svg
            height="24px"
            width="24px"
            fill="currentColor"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            {...props}
        >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
        </svg>
    );
};

export default ArrowForward;
