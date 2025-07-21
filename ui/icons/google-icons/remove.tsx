import cn from '@/utils/cn';

type Props = {
    className?: string;
};

const Remove = ({ className, ...props }: Props) => {
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
            <path d="M200-440v-80h560v80H200Z" />
        </svg>
    );
};

export default Remove;
