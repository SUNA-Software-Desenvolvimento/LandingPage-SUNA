import type { ServiceIcon } from '../content';

type Name = ServiceIcon | 'arrow' | 'arrow-left' | 'whatsapp' | 'instagram' | 'menu' | 'close';

const paths: Record<Name, JSX.Element> = {
  system: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  platform: (
    <>
      <path d="M12 3.5 21 8l-9 4.5L3 8z" />
      <path d="m3 12.5 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
    </>
  ),
  data: (
    <>
      <path d="M4 20V11M10 20V5M16 20v-7M21 20H3" />
    </>
  ),
  infra: (
    <>
      <rect x="3" y="4" width="18" height="6.5" rx="2" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="2" />
      <path d="M7 7.25h.01M7 16.75h.01" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  'arrow-left': <path d="M19 12H5m6-6-6 6 6 6" />,
  whatsapp: (
    <>
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.7z" />
      <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2.2-1.1-1 1c-1.2-.5-2.2-1.5-2.7-2.7l1-1-1.1-2.2z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({ name, size = 24 }: { name: Name; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
