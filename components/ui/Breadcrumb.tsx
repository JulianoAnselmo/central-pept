import Link from 'next/link';

export type Crumb = { label: string; href?: string };

type Props = { items: Crumb[]; siteUrl?: string };

export default function Breadcrumb({ items, siteUrl = '' }: Props) {
  // JSON-LD BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Caminho" className="text-sm text-ink-3 flex items-center gap-1.5 flex-wrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-teal-700">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-2" aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
