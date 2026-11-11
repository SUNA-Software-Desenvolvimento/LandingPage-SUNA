import type { CSSProperties } from 'react';
import wordmark from '../assets/brand/suna-wordmark.png';
import fullLogo from '../assets/brand/suna-logo-completo.png';
import symbol from '../assets/brand/suna-simbolo.png';

const sources = {
  wordmark: { src: wordmark, ratio: '395 / 96' },
  full: { src: fullLogo, ratio: '447 / 162' },
  symbol: { src: symbol, ratio: '1 / 1' },
};

// As logos são PNG transparentes usados como máscara: a cor vem de `color` no CSS.
export function Brand({
  variant,
  label = 'SUNA',
  className = '',
  decorative = false,
}: {
  variant: keyof typeof sources;
  label?: string;
  className?: string;
  decorative?: boolean;
}) {
  const { src, ratio } = sources[variant];
  const style = { '--mark': `url(${src})`, aspectRatio: ratio } as CSSProperties;
  return decorative ? (
    <span className={`brand-mark ${className}`} style={style} aria-hidden="true" />
  ) : (
    <span className={`brand-mark ${className}`} style={style} role="img" aria-label={label} />
  );
}
