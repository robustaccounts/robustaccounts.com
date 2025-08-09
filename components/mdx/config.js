import EnhancedCodeBlock from './components/enhanced-code-block';
import MDXTable from './components/table';
import { TableComponents } from './components/table-components';

// Custom components for MDX with enhanced blog styling
export const mdxComponents = {
  // Heading components with better visual hierarchy
  h1: ({ children, ...props }) => (
    <div className="relative mb-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-4" {...props}>
        {children}
      </h1>
      <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full"></div>
    </div>
  ),
  h2: ({ children, ...props }) => (
    <div className="relative mt-16 mb-8 first:mt-0">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3" {...props}>
        {children}
      </h2>
      <div className="h-0.5 w-16 bg-accent rounded-full"></div>
    </div>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-12 mb-6 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 relative before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:rounded-full" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-10 mb-4 text-xl sm:text-2xl font-semibold tracking-tight text-gray-900" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="mt-8 mb-3 text-lg sm:text-xl font-semibold tracking-tight text-gray-900" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="mt-8 mb-3 text-base sm:text-lg font-semibold tracking-tight text-gray-900" {...props}>
      {children}
    </h6>
  ),

  // Enhanced paragraph with better spacing
  p: ({ children, ...props }) => (
    <p className="mb-8 text-lg sm:text-xl leading-relaxed text-gray-700 selection:bg-accent/20" {...props}>
      {children}
    </p>
  ),

  // Enhanced list styling
  ul: ({ children, ...props }) => (
    <ul className="mb-8 space-y-4 text-lg sm:text-xl leading-relaxed text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-8 space-y-4 text-lg sm:text-xl leading-relaxed text-gray-700 counter-reset-item" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="flex items-start gap-4 group" {...props}>
      <div className="mt-2 flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-sm group-hover:scale-110 transition-transform"></div>
      <span className="flex-1">{children}</span>
    </li>
  ),

  // Enhanced blockquote with better styling
  blockquote: ({ children, ...props }) => (
    <blockquote className="relative my-10 border-l-4 border-accent bg-gradient-to-r from-secondary/50 to-secondary/20 p-8 text-lg sm:text-xl italic leading-relaxed text-gray-700 rounded-r-lg shadow-sm" {...props}>
      <div className="absolute -top-2 -left-2 text-4xl text-accent/30 font-serif">"</div>
      {children}
      <div className="absolute -bottom-4 -right-2 text-4xl text-accent/30 font-serif rotate-180">"</div>
    </blockquote>
  ),

  // Enhanced strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900 bg-gradient-to-r from-accent/10 to-primary/10 px-1 rounded" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-800 font-medium" {...props}>
      {children}
    </em>
  ),

  // Horizontal rule with styling
  hr: ({ ...props }) => (
    <div className="my-12 flex items-center justify-center" {...props}>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      <div className="mx-4 h-2 w-2 rounded-full bg-accent"></div>
      <div className="h-px w-24 bg-gradient-to-r from-accent via-accent to-transparent"></div>
    </div>
  ),

  // Enhanced link styling
  a: ({ children, href, ...props }) => (
    <a 
      href={href} 
      className="text-accent hover:text-primary underline decoration-accent/30 hover:decoration-primary underline-offset-2 transition-colors font-medium" 
      {...props}
    >
      {children}
    </a>
  ),

  // Inline code with better styling
  code: ({ className, children, ...props }) => {
    // If code is in a pre block, render as normal code
    if (className?.includes('language-')) {
      return <code className={className} {...props}>{children}</code>;
    }
    return (
      <code
        className="inline-flex items-center rounded-md bg-gradient-to-r from-gray-100 to-gray-50 px-2 py-1 font-mono text-sm font-semibold text-gray-800 border border-gray-200 shadow-sm"
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
