import * as React from 'react';

import cn from '@/utils/cn';

const BusinessAdvisory = (props: React.SVGProps<SVGSVGElement>) => {
    const { className, ...rest } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={cn('h-8 w-8', className)}
            {...rest}
        >
            <path
                d="M6.5 2a.5.5 0 0 0-.5.5v27.002a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5V6.534a.5.5 0 0 0 0-.024.5.5 0 0 0-.146-.362l-4-4a.5.5 0 0 0-.362-.146.5.5 0 0 0-.064.004.5.5 0 0 0-.084-.006H6.5zM7 3h14v3.502a.5.5 0 0 0 .5.5H25v22H7V3zm15 .709 2.293 2.293H22V3.709zm-11 .293c-1.651 0-3 1.349-3 3a.5.5 0 0 0 .5.5H11a.5.5 0 0 0 .5-.5v-2.5a.5.5 0 0 0-.5-.5zm7.455 0a.5.5 0 0 0 .05 1h.99a.5.5 0 1 0 0-1h-.99a.5.5 0 0 0-.05 0zm-5.955.5a.5.5 0 0 0-.5.5v3H9a.5.5 0 0 0-.5.5 4.002 4.002 0 0 0 6.828 2.83 4.003 4.003 0 0 0 .867-4.36 4.004 4.004 0 0 0-3.695-2.47zm-2 .707v1.293H9.207A1.82 1.82 0 0 1 10.5 5.209zm2.5.445c.992.18 1.876.747 2.271 1.701a2.994 2.994 0 0 1-.65 3.268 2.997 2.997 0 0 1-3.27.65c-.954-.395-1.52-1.28-1.699-2.271H12.5a.5.5 0 0 0 .5-.5V5.654zm5.455.348a.5.5 0 0 0 .05 1h.99a.5.5 0 1 0 0-1h-.99a.5.5 0 0 0-.05 0zm.121 2a.5.5 0 0 0 .051 1h4.857a.5.5 0 1 0 0-1h-4.857a.5.5 0 0 0-.05 0zm0 2a.5.5 0 0 0 .051 1h4.857a.5.5 0 1 0 0-1h-4.857a.5.5 0 0 0-.05 0zm-2.039 2a.5.5 0 0 0 .05 1h6.901a.5.5 0 1 0 0-1h-6.9a.5.5 0 0 0-.05 0zm-8.058 2a.5.5 0 0 0 .05 1h14.942a.5.5 0 1 0 0-1H8.529a.5.5 0 0 0-.05 0zm0 2a.5.5 0 0 0 .05 1h14.942a.5.5 0 1 0 0-1H8.529a.5.5 0 0 0-.05 0zm.013 1.994a.5.5 0 0 0-.492.506v9a.5.5 0 0 0 .5.5h13a.5.5 0 1 0 0-1H21v-3.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v3.5h-1v-5.514a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v5.514h-1v-3.514a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v3.514H9v-8.5a.5.5 0 0 0-.508-.506zM15 21.988h1v5h-1v-5zm-4 2h1v3h-1v-3zm8 .014h1v2.986h-1v-2.986z"
                color="#000"
                fontFamily="sans-serif"
                fontWeight={400}
                overflow="visible"
                style={{
                    lineHeight: 'normal',
                    textIndent: '0',
                    textAlign: 'start',
                    textDecorationLine: 'none',
                    textDecorationStyle: 'solid',
                    textDecorationColor: '#000',
                    textTransform: 'none',
                    msBlockProgression: 'tb',
                    isolation: 'auto',
                    mixBlendMode: 'normal',
                }}
            ></path>
        </svg>
    );
};

export default BusinessAdvisory;
