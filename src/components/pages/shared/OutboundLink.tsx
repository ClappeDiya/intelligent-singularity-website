import React from 'react';
import Link from 'next/link';

export function OutboundLink({
  href, children, className,
}: { href: string; children: React.ReactNode; className?: string }) {
  const isExternal = /^https?:\/\//.test(href);
  if (!isExternal) {
    return <Link href={href} className={className}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer external" className={className}>
      {children}
      <span aria-hidden="true" className="inline-block ms-1">↗</span>
    </a>
  );
}
