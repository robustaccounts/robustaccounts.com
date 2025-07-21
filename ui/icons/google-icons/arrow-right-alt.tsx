import * as React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const ArrowRightAlt = ({ className, ...props }: Props) => {
    return (
        <svg
            height="24px"
            width="24px"
            fill="#e3e3e3"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('h-6 w-6', className)}
            {...props}
        >
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
        </svg>
    );
};

export default ArrowRightAlt;
