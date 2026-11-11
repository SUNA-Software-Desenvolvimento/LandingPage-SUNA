// Geometria do jardim de areia: linhas rasteladas que contornam "pedras".
// Usada pelo canvas do topo e pelos desenhos estáticos em SVG.

// Uma pedra é uma superelipse: power 2 é uma elipse, valores maiores
// arredondam um retângulo (usado para contornar blocos de texto).
export type Shape = { cx: number; cy: number; rx: number; ry: number; reach?: number; power?: number };

// Empurra o ponto para fora de cada pedra, comprimindo os sulcos ao redor dela.
export function displace(x: number, y: number, shapes: Shape[]): [number, number] {
  let px = x;
  let py = y;
  for (const s of shapes) {
    const reach = s.reach ?? 2.1;
    const p = s.power ?? 2;
    const u = Math.abs(px - s.cx) / s.rx;
    const v = Math.abs(py - s.cy) / s.ry;
    const d = p === 2 ? Math.hypot(u, v) : Math.pow(Math.pow(u, p) + Math.pow(v, p), 1 / p);
    if (d >= reach || d < 1e-4) continue;
    const scale = (1 + (d * (reach - 1)) / reach) / d;
    px = s.cx + (px - s.cx) * scale;
    py = s.cy + (py - s.cy) * scale;
  }
  return [px, py];
}

// Gera os caminhos SVG das linhas rasteladas para um retângulo de largura w e altura h.
export function rakedPaths(w: number, h: number, shapes: Shape[], spacing = 14, step = 6): string[] {
  const paths: string[] = [];
  for (let y = spacing / 2; y < h; y += spacing) {
    let d = '';
    for (let x = -step; x <= w + step; x += step) {
      const [px, py] = displace(x, y, shapes);
      d += `${d ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`;
    }
    paths.push(d);
  }
  return paths;
}
