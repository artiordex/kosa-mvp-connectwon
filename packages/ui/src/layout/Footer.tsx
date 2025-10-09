/**
 * Description : Footer.tsx - 📌 ConnectWon UI 푸터 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
import type { FooterProps } from '../ui-types.js';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const DefaultLink = ({ href, children, className, external }: InternalLinkProps) =>
  external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );

export interface FooterWithLinkProps extends FooterProps {
  LinkComponent?: React.ElementType;
}

export default function Footer({
  brand,
  columns = [],
  social = [],
  legal = [],
  year = new Date().getFullYear(),
  className,
  containerClassName,
  bottomRightSlot,
  LinkComponent = DefaultLink, // ✅ 외부 주입 가능 (기본은 <a>)
}: FooterWithLinkProps) {
  return (
    <footer className={['bg-gray-900 text-white', className].filter(Boolean).join(' ')}>
      <div className={['max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16', containerClassName].filter(Boolean).join(' ')}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* 좌측: 브랜드/소개 */}
          <div className="md:col-span-5">
            {brand?.logo || brand?.name ? (
              <div className="flex items-center mb-4 gap-3">
                {brand?.logo}
                {brand?.name ? <h3 className="text-2xl font-bold text-white">{brand.name}</h3> : null}
              </div>
            ) : null}

            {brand?.description ? <div className="text-gray-300 mb-6 leading-relaxed">{brand.description}</div> : null}

            {social.length > 0 && (
              <div className="flex gap-6">
                {social.map(s => (
                  <LinkComponent
                    key={s.label}
                    href={s.href}
                    external={s.external}
                    aria-label={s.label}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {s.icon ?? <span className="text-sm">{s.label}</span>}
                  </LinkComponent>
                ))}
              </div>
            )}
          </div>

          {/* 우측: 컬럼들 */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {columns.map(col => (
                <div key={col.title}>
                  <h4 className="text-lg font-semibold mb-4">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.links.map(l => (
                      <li key={l.label}>
                        <LinkComponent href={l.href} external={l.external} className="text-gray-300 hover:text-white transition-colors">
                          {l.label}
                        </LinkComponent>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {year} {brand?.name ?? 'ConnectWon'}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {legal.map(l => (
                <LinkComponent key={l.label} href={l.href} external={l.external} className="text-gray-400 hover:text-white text-sm">
                  {l.label}
                </LinkComponent>
              ))}
              {bottomRightSlot}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
