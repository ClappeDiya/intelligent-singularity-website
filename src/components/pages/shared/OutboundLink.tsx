import React from 'react';
import Link from 'next/link';
import { SrOpensInNewTab } from './SrOpensInNewTab';

export function OutboundLink({
  href, children, className, style,
}: { href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const isExternal = /^https?:\/\//.test(href);
  if (!isExternal) {
    return <Link href={href} className={className} style={style}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer external" className={className} style={style}>
      {children}
      <SrOpensInNewTab />
      <span aria-hidden="true" className="inline-block ms-1">↗</span>
    </a>
  );
}
