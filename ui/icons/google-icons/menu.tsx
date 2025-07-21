import React from 'react';

import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const Menu = ({ className, ...props }: Props) => {
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
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
    );
};

export default Menu;
