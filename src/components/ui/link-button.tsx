import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type LinkButtonProps = {
  href: string;
  /** Links externos (ex.: WhatsApp, redes) abrem em novo separador. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Link com aparência de botão. Usado para CTAs de navegação e ligações
 * externas — mantém a semântica de <a> (correcta para navegação) em vez de
 * forçar um <button>.
 */
export function LinkButton({
  href,
  external,
  variant,
  size,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
