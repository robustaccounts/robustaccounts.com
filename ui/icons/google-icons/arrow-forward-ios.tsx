import * as React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};
const ArrowForwardIos = ({ className, ...props }: Props) => {
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
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
    );
};

export default ArrowForwardIos;
