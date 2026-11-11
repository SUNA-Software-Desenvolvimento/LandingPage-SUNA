import { useMemo } from 'react';
import { rakedPaths, type Shape } from './garden';

// Faixa estática de areia rastelada em SVG, usada entre seções e no jardim das sete pedras.
export function Rake({
  width = 1200,
  height = 60,
  shapes = [],
  spacing = 14,
  className = '',
}: {
  width?: number;
  height?: number;
  shapes?: Shape[];
  spacing?: number;
  className?: string;
}) {
  const paths = useMemo(() => rakedPaths(width, height, shapes, spacing), [width, height, shapes, spacing]);
  return (
    <svg className={`rake ${className}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} className="rake-groove" />
          <path d={d} className="rake-crest" transform="translate(0 1.8)" />
        </g>
      ))}
    </svg>
  );
}
