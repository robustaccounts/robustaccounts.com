import * as React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const ChevronRight = ({ className, ...props }: Props) => {
    return (
        <svg
            height="24px"
            width="24px"
            fill="#e3e3e3"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            {...props}
        >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
    );
};

export default ChevronRight;
