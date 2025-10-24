import EnhancedCodeBlock from './components/enhanced-code-block';
import MDXTable from './components/table';
import { TableComponents } from './components/table-components';

// Custom components for MDX with modern minimalistic styling for finance blogs
export const mdxComponents = {
  // Headings - professional and clean
  h1: ({ children, ...props }) => (
    <h1 className="mb-6 mt-8 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mb-5 mt-12 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 sm:text-3xl" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mb-4 mt-8 text-xl font-semibold text-gray-900 sm:text-2xl" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mb-3 mt-6 text-lg font-semibold text-gray-900 sm:text-xl" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="mb-3 mt-6 text-base font-semibold text-gray-900 sm:text-lg" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="mb-2 mt-6 text-base font-semibold text-gray-700" {...props}>
      {children}
    </h6>
  ),

  // Paragraphs - comfortable reading size
  p: ({ children, ...props }) => (
    <p className="mb-5 text-base leading-relaxed text-gray-700 sm:text-lg sm:leading-8" {...props}>
      {children}
    </p>
  ),

  // Lists - clean with better spacing
  ul: ({ children, ...props }) => (
    <ul className="mb-6 ml-6 space-y-2 text-base text-gray-700 sm:text-lg" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-6 ml-6 space-y-2 text-base text-gray-700 sm:text-lg" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-2 leading-relaxed marker:text-accent" {...props}>
      {children}
    </li>
  ),

  // Blockquote - professional finance style
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-6 border-l-4 border-accent bg-gray-50 px-6 py-4 italic text-gray-700" {...props}>
      {children}
    </blockquote>
  ),

  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700" {...props}>
      {children}
    </em>
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="my-10 border-t border-gray-200" {...props} />
  ),

  // Links - professional accent color
  a: ({ children, href, ...props }) => (
    <a 
      href={href} 
      className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent/80 hover:decoration-accent" 
      {...props}
    >
      {children}
    </a>
  ),

  // Inline code - subtle and clean
  code: ({ className, children, ...props }) => {
    // If code is in a pre block, render as normal code
    if (className?.includes('language-')) {
      return <code className={className} {...props}>{children}</code>;
    }
    return (
      <code
        className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-800 before:content-[''] after:content-['']"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Enhanced table component
  MDXTable,

  // Table components for native MDX tables
  ...TableComponents,

  // Enhanced code block component with language syntax highlighting and copy button
  pre: ({ children }) => {
    // Check if children is valid and has className property
    if (!children?.props?.className) {
      return <pre>{children}</pre>;
    }
    return (
      <EnhancedCodeBlock className={children.props.className}>
        {children.props.children}
      </EnhancedCodeBlock>
    );
  },
};
