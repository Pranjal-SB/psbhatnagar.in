import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="cs-h1" {...props} />,
    h2: (props) => <h2 className="cs-h2" {...props} />,
    h3: (props) => <h3 className="cs-h3" {...props} />,
    p: (props) => <p className="cs-p" {...props} />,
    a: (props) => <a className="cs-a" {...props} />,
    ul: (props) => <ul className="cs-ul" {...props} />,
    li: (props) => <li className="cs-li" {...props} />,
    code: (props) => <code className="cs-code" {...props} />,
    blockquote: (props) => <blockquote className="cs-quote" {...props} />,
    hr: () => <hr className="cs-hr" />,
    ...components,
  };
}
