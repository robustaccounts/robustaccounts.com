import React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const Swap = ({ className, ...props }: Props) => {
    return (
        <svg
            height="24px"
            width="24px"
            fill="#1f1f1f"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            {...props}
        >
            <path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" />
        </svg>
    );
};

export default Swap;
