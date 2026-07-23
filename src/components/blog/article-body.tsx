import Markdown from "react-markdown";

/** Renderiza o conteúdo do artigo (Markdown) com a tipografia de leitura. */
export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-6">
      <Markdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-1 text-xl font-semibold text-ink">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-pretty text-[1.05rem] leading-relaxed text-muted-foreground">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="flex flex-col gap-2.5 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="flex list-decimal flex-col gap-2.5 pl-5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[1.05rem] leading-relaxed text-foreground marker:text-gold-strong">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-gold-strong underline underline-offset-4">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
