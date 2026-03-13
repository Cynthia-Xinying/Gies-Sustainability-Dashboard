import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

// Solar System — pure constants (no D3)
const ORBITS = [
  { rx: 160, ry: 68, tilt: -0.15, speed: 0.0028 },
  { rx: 265, ry: 110, tilt: -0.1, speed: 0.0018 },
  { rx: 365, ry: 152, tilt: -0.06, speed: 0.0011 },
];

const PLANETS = [
  { sdg: 13, name: 'Climate Action', color: '#3f7e44', pubs: 73, topFaculty: 'Prof. Deryugina', dept: 'Finance', orbit: 0, angle: 0 },
  { sdg: 8, name: 'Decent Work', color: '#a21942', pubs: 67, topFaculty: 'Prof. Lough', dept: 'Business Administration', orbit: 0, angle: 1.26 },
  { sdg: 12, name: 'Responsible Consumption', color: '#bf8b2e', pubs: 56, topFaculty: 'Prof. Fullerton', dept: 'Finance', orbit: 0, angle: 2.51 },
  { sdg: 10, name: 'Reduced Inequalities', color: '#dd1367', pubs: 52, topFaculty: 'Prof. Ahsen', dept: 'Business Administration', orbit: 0, angle: 3.77 },
  { sdg: 7, name: 'Clean Energy', color: '#fcc30b', pubs: 45, topFaculty: 'Prof. Fullerton', dept: 'Finance', orbit: 0, angle: 5.03 },
  { sdg: 17, name: 'Partnerships', color: '#19486a', pubs: 42, topFaculty: 'Prof. Mahoney', dept: 'Business Administration', orbit: 1, angle: 0.3 },
  { sdg: 9, name: 'Innovation', color: '#fd6925', pubs: 38, topFaculty: 'Prof. Ahsen', dept: 'Business Administration', orbit: 1, angle: 1.35 },
  { sdg: 16, name: 'Peace & Justice', color: '#00689d', pubs: 31, topFaculty: 'Prof. Abdel-Khalik', dept: 'Accountancy', orbit: 1, angle: 2.39 },
  { sdg: 11, name: 'Sustainable Cities', color: '#fd9d24', pubs: 28, topFaculty: 'Prof. Mehrotra', dept: 'Business Administration', orbit: 1, angle: 3.44 },
  { sdg: 4, name: 'Quality Education', color: '#c5192d', pubs: 22, topFaculty: 'Prof. Lough', dept: 'Business Administration', orbit: 1, angle: 4.49 },
  { sdg: 5, name: 'Gender Equality', color: '#ff3a21', pubs: 18, topFaculty: 'Prof. Otnes', dept: 'Business Administration', orbit: 1, angle: 5.53 },
  { sdg: 3, name: 'Good Health', color: '#4c9f38', pubs: 15, topFaculty: 'Prof. Ahsen', dept: 'Business Administration', orbit: 2, angle: 0.52 },
  { sdg: 1, name: 'No Poverty', color: '#e5243b', pubs: 12, topFaculty: 'Prof. Lough', dept: 'Business Administration', orbit: 2, angle: 1.57 },
  { sdg: 2, name: 'Zero Hunger', color: '#dda63a', pubs: 8, topFaculty: 'Prof. Lough', dept: 'Business Administration', orbit: 2, angle: 2.62 },
  { sdg: 6, name: 'Clean Water', color: '#26bde2', pubs: 3, topFaculty: 'Prof. Mehrotra', dept: 'Business Administration', orbit: 2, angle: 3.67 },
  { sdg: 14, name: 'Life Below Water', color: '#0a97d9', pubs: 6, topFaculty: 'Prof. Deryugina', dept: 'Finance', orbit: 2, angle: 4.71 },
  { sdg: 15, name: 'Life on Land', color: '#56c02b', pubs: 9, topFaculty: 'Prof. Deryugina', dept: 'Finance', orbit: 2, angle: 5.76 },
];

const SDG_RANK: Record<number, number> = {
  13: 1, 8: 2, 12: 3, 10: 4, 7: 5, 17: 6, 9: 7, 16: 8, 11: 9, 4: 10,
  5: 11, 3: 12, 1: 13, 2: 14, 15: 15, 14: 16, 6: 17,
};
const SDG_PCT: Record<number, number> = {
  13: 18.4, 8: 16.9, 12: 14.1, 10: 13.1, 7: 11.3, 17: 10.6, 9: 9.6,
  16: 7.8, 11: 7.1, 4: 5.5, 5: 4.5, 3: 3.8, 1: 3.0, 2: 2.0, 15: 2.3, 14: 1.5, 6: 0.8,
};

// ─── TypeScript Interfaces ─────────────────────────────────────────────
interface NetworkNode {
  id: string;
  label: string;
  size: number;
  isSDG: boolean;
}

interface NetworkLink {
  source: string;
  target: string;
  value: number;
}

interface SDGData {
  sdg: number;
  name: string;
  color: string;
  pubs: number;
  topFaculty: string;
  pct: number;
}

interface ChampionData {
  rank: number;
  medal: string;
  sdg: number;
  name: string;
  color: string;
  pubs: number;
  topFaculty: string;
  dept: string;
  blurb: string;
}

// ─── Network Data ──────────────────────────────────────────────────────
const NODES: NetworkNode[] = [
  { id: 'fin', label: 'Finance & Investment', size: 1164, isSDG: false },
  { id: 'ops', label: 'Operations & Supply Chain', size: 1075, isSDG: false },
  { id: 'mkt', label: 'Marketing & Consumer', size: 1028, isSDG: false },
  { id: 'eco', label: 'Econometrics & Methods', size: 1000, isSDG: false },
  { id: 'beh', label: 'Behavioral & Experimental', size: 987, isSDG: false },
  { id: 'intl', label: 'International Business', size: 958, isSDG: false },
  { id: 'info', label: 'Information Systems', size: 921, isSDG: false },
  { id: 'str', label: 'Strategy & Innovation', size: 825, isSDG: false },
  { id: 'gov', label: 'Corporate Governance', size: 801, isSDG: false },
  { id: 'acc', label: 'Accounting & Auditing', size: 665, isSDG: false },
  { id: 'sus', label: 'Sustainability & ESG', size: 655, isSDG: true },
  { id: 'fecon', label: 'Financial Economics', size: 524, isSDG: false },
];

const LINKS: NetworkLink[] = [
  { source: 'fin', target: 'mkt', value: 715 },
  { source: 'gov', target: 'fin', value: 685 },
  { source: 'fin', target: 'intl', value: 637 },
  { source: 'fin', target: 'ops', value: 629 },
  { source: 'beh', target: 'mkt', value: 623 },
  { source: 'eco', target: 'fin', value: 581 },
  { source: 'info', target: 'ops', value: 569 },
  { source: 'intl', target: 'mkt', value: 569 },
  { source: 'fin', target: 'str', value: 561 },
  { source: 'beh', target: 'eco', value: 554 },
  { source: 'gov', target: 'mkt', value: 534 },
  { source: 'acc', target: 'fin', value: 520 },
  { source: 'sus', target: 'fin', value: 498 },
  { source: 'sus', target: 'eco', value: 471 },
  { source: 'sus', target: 'intl', value: 445 },
  { source: 'sus', target: 'str', value: 430 },
  { source: 'sus', target: 'gov', value: 418 },
  { source: 'sus', target: 'beh', value: 390 },
];

// ─── Grid filter categories ────────────────────────────────────────────
const SDG_CATEGORIES: Record<string, number[]> = {
  all: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  people: [1, 2, 3, 4, 5, 6],
  planet: [6, 13, 14, 15],
  prosperity: [7, 8, 9, 10, 11, 12, 16, 17],
};

// ─── Custom Hook: Count-up on scroll ────────────────────────────────────
function useCountUp(
  end: number,
  suffix: string,
  duration: number,
  isVisible: boolean
): string {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    const startVal = 0;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startVal + (end - startVal) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return `${value}${suffix}`;
}

// ─── Main Component ────────────────────────────────────────────────────
export default function ResearchAreas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    title: string;
    pubs: number;
    susConnected: boolean;
  }>({ visible: false, x: 0, y: 0, title: '', pubs: 0, susConnected: false });
  const [sdgFilter, setSdgFilter] = useState<'all' | 'people' | 'planet' | 'prosperity'>('all');
  const [viewMode, setViewMode] = useState<'galaxy' | 'grid'>('galaxy');
  const [hoveredSDG, setHoveredSDG] = useState<number | null>(null);
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const planetPositionsRef = useRef<Array<{ sdg: number; x: number; y: number; r: number }>>([]);
  const navigate = useNavigate();

  // IntersectionObserver for stats count-up
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stat1 = useCountUp(397, '', 1500, statsVisible);
  const stat2 = useCountUp(20.9, '%', 1500, statsVisible);
  const stat3 = useCountUp(288, '%+', 1500, statsVisible);
  const stat4 = useCountUp(13, '/17', 1500, statsVisible);

  // D3 Force Network — Layout fix + visual upgrade
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = svgEl.clientWidth || containerRef.current?.clientWidth || window.innerWidth;
    const height = svgEl.clientHeight || Math.min(window.innerHeight * 0.7, 700);

    d3.select(svgEl).selectAll('*').remove();
    svgEl.setAttribute('width', String(width));
    svgEl.setAttribute('height', String(height));

    const svg = d3.select(svgEl);

    // Star field background
    const stars = svg.insert('g', ':first-child');
    for (let i = 0; i < 60; i++) {
      stars
        .append('circle')
        .attr('cx', Math.random() * width)
        .attr('cy', Math.random() * height)
        .attr('r', Math.random() * 1.2 + 0.3)
        .attr('fill', 'white')
        .attr('opacity', Math.random() * 0.4 + 0.1);
    }

    // SVG defs — filters and gradients
    const defs = svg.append('defs');

    const glowFilter = defs
      .append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    glowFilter.append('feGaussianBlur').attr('stdDeviation', '6').attr('result', 'coloredBlur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const softGlow = defs.append('filter').attr('id', 'softglow');
    softGlow.append('feGaussianBlur').attr('stdDeviation', '2').attr('result', 'blur');
    const sfm = softGlow.append('feMerge');
    sfm.append('feMergeNode').attr('in', 'blur');
    sfm.append('feMergeNode').attr('in', 'SourceGraphic');

    const susGrad = defs.append('radialGradient').attr('id', 'susGrad');
    susGrad.append('stop').attr('offset', '0%').attr('stop-color', '#4ade80');
    susGrad.append('stop').attr('offset', '100%').attr('stop-color', '#16a34a');

    const nodeGrad = defs.append('radialGradient').attr('id', 'nodeGrad');
    nodeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#2d5a9e');
    nodeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#0f2744');

    // Pulse ring CSS
    if (!document.getElementById('network-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'network-pulse-style';
      style.textContent = `
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          50%  { transform: scale(1.25); opacity: 0.2; }
          100% { transform: scale(1);   opacity: 0.6; }
        }
        .pulse-ring { animation: pulse-ring 2.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      `;
      document.head.appendChild(style);
    }

    const nodes = NODES.map((d) => ({ ...d, x: width / 2, y: height / 2 }));
    const nodeById = new Map(nodes.map((n) => [n.id, n]));
    const links = LINKS.map((l) => ({
      ...l,
      source: nodeById.get(l.source),
      target: nodeById.get(l.target),
    })).filter((l) => l.source && l.target) as { source: NetworkNode & { x?: number; y?: number }; target: NetworkNode & { x?: number; y?: number }; value: number }[];

    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: { id: string }) => d.id)
          .distance((d: { source: { id: string }; target: { id: string } }) =>
            d.source.id === 'sus' || d.target.id === 'sus' ? 180 : 130
          )
          .strength(0.4)
      )
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force(
        'collision',
        d3.forceCollide().radius((d: { size?: number }) => Math.sqrt(d.size ?? 500) * 1.8 + 40).strength(1)
      )
      .force('x', d3.forceX(width / 2).strength(0.04))
      .force('y', d3.forceY(height / 2).strength(0.06))
      .alphaDecay(0.015)
      .velocityDecay(0.3);

    const susNode = nodes.find((n) => n.id === 'sus') as (NetworkNode & { fx?: number | null; fy?: number | null }) | undefined;
    if (susNode) {
      susNode.fx = width / 2;
      susNode.fy = height / 2;
      setTimeout(() => {
        susNode.fx = null;
        susNode.fy = null;
        simulation.alpha(0.3).restart();
      }, 2000);
    }

    // Links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => (d.source.id === 'sus' || d.target.id === 'sus' ? '#22c55e' : '#3b82f6'))
      .attr('stroke-opacity', (d) => (d.source.id === 'sus' || d.target.id === 'sus' ? 0.5 : 0.15))
      .attr('stroke-width', (d) => Math.max(0.5, d.value / 250))
      .attr('opacity', 0);

    // Nodes
    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .attr('transform', (d) => `translate(${d.x ?? width / 2},${d.y ?? height / 2})`);

    nodeGroup
      .filter((d) => d.id === 'sus')
      .append('circle')
      .attr('class', 'pulse-ring')
      .attr('r', (d) => Math.sqrt(d.size) * 1.8 + 8)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6);

    nodeGroup
      .append('circle')
      .attr('r', (d) => Math.sqrt(d.size) * 1.8)
      .attr('fill', (d) => (d.isSDG ? 'url(#susGrad)' : 'url(#nodeGrad)'))
      .attr('stroke', (d) => (d.isSDG ? '#86efac' : '#3b82f6'))
      .attr('stroke-width', (d) => (d.isSDG ? 2.5 : 1))
      .attr('filter', (d) => (d.isSDG ? 'url(#glow)' : 'url(#softglow)'));

    nodeGroup
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', (d) => `${Math.max(9, Math.sqrt(d.size) * 0.55)}px`)
      .attr('font-weight', (d) => (d.isSDG ? '700' : '400'))
      .attr('pointer-events', 'none')
      .attr('opacity', 0.9);

    nodeGroup
      .attr('opacity', 0)
      .transition()
      .delay((_, i) => i * 60)
      .duration(600)
      .attr('opacity', 1);

    link
      .transition()
      .delay(400)
      .duration(800)
      .attr('opacity', 1)
      .attr('stroke-opacity', (d) => (d.source.id === 'sus' || d.target.id === 'sus' ? 0.5 : 0.15));

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x ?? 0)
        .attr('y1', (d) => d.source.y ?? 0)
        .attr('x2', (d) => d.target.x ?? 0)
        .attr('y2', (d) => d.target.y ?? 0);
      nodeGroup.attr('transform', (d) => `translate(${(d as NetworkNode & { x?: number }).x ?? 0},${(d as NetworkNode & { y?: number }).y ?? 0})`);
    });

    nodeGroup
      .on('mouseover', function (event: MouseEvent, d: NetworkNode) {
        const connectedIds = new Set<string>();
        links.forEach((l) => {
          if (l.source.id === d.id) connectedIds.add(l.target.id);
          if (l.target.id === d.id) connectedIds.add(l.source.id);
        });
        connectedIds.add(d.id);

        nodeGroup.transition().duration(150).attr('opacity', (n) => (connectedIds.has(n.id) ? 1 : 0.15));

        d3.select(this)
          .select('circle:not(.pulse-ring)')
          .transition()
          .duration(150)
          .attr('r', (n: NetworkNode) => Math.sqrt(n.size) * 1.8 * 1.18)
          .attr('stroke-width', 3);

        link
          .transition()
          .duration(150)
          .attr('stroke-opacity', (l) => {
            const connected = l.source.id === d.id || l.target.id === d.id;
            if (!connected) return 0.03;
            return l.source.id === 'sus' || l.target.id === 'sus' ? 0.9 : 0.7;
          })
          .attr('stroke', (l) => {
            const connected = l.source.id === d.id || l.target.id === d.id;
            if (!connected) return '#3b82f6';
            return l.source.id === 'sus' || l.target.id === 'sus' ? '#22c55e' : '#ffffff';
          })
          .attr('stroke-width', (l) => {
            const connected = l.source.id === d.id || l.target.id === d.id;
            return connected ? Math.max(1.5, l.value / 180) : 0.3;
          });

        const isSusConnected = connectedIds.has('sus') && d.id !== 'sus';
        setTooltip({ visible: true, x: event.clientX + 14, y: event.clientY - 10, title: d.label, pubs: d.size, susConnected: isSusConnected });
      })
      .on('mousemove', (event: MouseEvent) => {
        setTooltip((prev) => (prev.visible ? { ...prev, x: event.clientX + 14, y: event.clientY - 10 } : prev));
      })
      .on('mouseout', function (_, d: NetworkNode) {
        nodeGroup.transition().duration(200).attr('opacity', 1);
        d3.select(this)
          .select('circle:not(.pulse-ring)')
          .transition()
          .duration(200)
          .attr('r', (n: NetworkNode) => Math.sqrt(n.size) * 1.8)
          .attr('stroke-width', (n) => (n.isSDG ? 2.5 : 1));
        link
          .transition()
          .duration(200)
          .attr('stroke-opacity', (l) => (l.source.id === 'sus' || l.target.id === 'sus' ? 0.5 : 0.15))
          .attr('stroke', (l) => (l.source.id === 'sus' || l.target.id === 'sus' ? '#22c55e' : '#3b82f6'))
          .attr('stroke-width', (l) => Math.max(0.5, l.value / 250));
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

    const resize = () => {
      const w = containerRef.current?.clientWidth ?? window.innerWidth;
      const h = Math.min(window.innerHeight * 0.7, 700);
      svgEl.setAttribute('width', String(w));
      svgEl.setAttribute('height', String(h));
    };
    window.addEventListener('resize', resize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Solar System — pure canvas animation (no D3)
  useEffect(() => {
    if (viewMode !== 'galaxy') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    const W = canvas.getBoundingClientRect().width;
    const H = canvas.getBoundingClientRect().height;
    const cx = W / 2;
    const cy = H / 2;

    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      base: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
      twinkle: Math.random() > 0.75,
    }));

    let sunRot = 0;
    let pulseR = 55;

    function planetXY(orbitIdx: number, angle: number) {
      const o = ORBITS[orbitIdx];
      const cos = Math.cos(o.tilt);
      const sin = Math.sin(o.tilt);
      const px = Math.cos(angle) * o.rx;
      const py = Math.sin(angle) * o.ry;
      return { x: cx + px * cos - py * sin, y: cy + px * sin + py * cos };
    }

    function adj(hex: string, amt: number) {
      const n = parseInt(hex.replace('#', ''), 16);
      const r = Math.min(255, Math.max(0, (n >> 16) + amt));
      const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
      const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
      return `rgb(${r},${g},${b})`;
    }

    if (!document.getElementById('planet-card-style')) {
      const s = document.createElement('style');
      s.id = 'planet-card-style';
      s.textContent = `@keyframes planet-card-in{from{opacity:0;transform:scale(0.82) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}`;
      document.head.appendChild(s);
    }

    function draw(frame: number) {
      ctx.clearRect(0, 0, W, H);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
      bg.addColorStop(0, '#0d2137');
      bg.addColorStop(0.55, '#060e1a');
      bg.addColorStop(1, '#000000');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const t = frame * 0.016;
      for (const s of stars) {
        const opacity = s.twinkle ? s.base + Math.sin(t * 0.9 + s.phase) * 0.18 : s.base;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      ctx.save();
      ctx.setLineDash([5, 9]);
      for (const o of ORBITS) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, o.rx, o.ry, o.tilt, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();

      const easeIn = Math.min(1, frame / 80);
      const ease = 1 - Math.pow(1 - easeIn, 3);

      const positions: Array<{ sdg: number; x: number; y: number; r: number; planet: (typeof PLANETS)[0] }> = [];
      for (const p of PLANETS) {
        const angle = p.angle + ORBITS[p.orbit].speed * frame;
        const target = planetXY(p.orbit, angle);
        const x = cx + (target.x - cx) * ease;
        const y = cy + (target.y - cy) * ease;
        const r = Math.max(22, Math.min(46, Math.sqrt(p.pubs) * 3.0 + 10));
        positions.push({ sdg: p.sdg, x, y, r, planet: p });
      }
      positions.sort((a, b) => a.y - b.y);

      for (const pos of positions) {
        const { x, y, r, planet } = pos;
        const isHovered = hoveredSDG === planet.sdg;
        const isSelected = selectedSDG === planet.sdg;
        ctx.save();
        ctx.globalAlpha = ease;

        if (isHovered || isSelected) {
          const glow = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 2.4);
          glow.addColorStop(0, planet.color + 'aa');
          glow.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.ellipse(x + 3, y + r * 0.55, r * 0.85, r * 0.28, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fill();

        const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r);
        grad.addColorStop(0, adj(planet.color, 70));
        grad.addColorStop(0.4, planet.color);
        grad.addColorStop(1, adj(planet.color, -55));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        const shine = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x - r * 0.3, y - r * 0.3, r * 0.55);
        shine.addColorStop(0, 'rgba(255,255,255,0.45)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = shine;
        ctx.fill();

        if (r >= 16) {
          ctx.fillStyle = 'rgba(255,255,255,0.70)';
          ctx.font = `500 ${Math.max(9, r * 0.3)}px system-ui`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('SDG', x, y - r * 0.22);
          ctx.fillStyle = 'white';
          ctx.font = `bold ${Math.max(13, r * 0.48)}px system-ui`;
          ctx.fillText(String(planet.sdg), x, y + r * 0.24);
        }

        ctx.fillStyle = `rgba(255,255,255,${isHovered ? 0.95 : 0.70})`;
        ctx.font = `${isHovered ? 'bold ' : ''}11px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(planet.name, x, y + r + 7);

        ctx.restore();
      }

      planetPositionsRef.current = positions.map((p) => ({ sdg: p.sdg, x: p.x, y: p.y, r: p.r }));

      sunRot += 0.004;
      pulseR += 0.5;
      if (pulseR > 105) pulseR = 58;

      const corona = ctx.createRadialGradient(cx, cy, 30, cx, cy, 120);
      corona.addColorStop(0, 'rgba(253,224,71,0.22)');
      corona.addColorStop(0.5, 'rgba(234,179,8,0.10)');
      corona.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      const pulseOpacity = Math.max(0, 1 - (pulseR - 58) / 47);
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(253,224,71,${pulseOpacity * 0.7})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      const pr2 = ((pulseR - 58 + 24) % 47) + 58;
      const po2 = Math.max(0, 1 - (pr2 - 58) / 47);
      ctx.beginPath();
      ctx.arc(cx, cy, pr2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(253,224,71,${po2 * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const midGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      midGlow.addColorStop(0, 'rgba(253,224,71,0.50)');
      midGlow.addColorStop(0.6, 'rgba(234,179,8,0.20)');
      midGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fillStyle = midGlow;
      ctx.fill();

      const sunGrad = ctx.createRadialGradient(cx - 16, cy - 16, 4, cx, cy, 55);
      sunGrad.addColorStop(0, '#fef9c3');
      sunGrad.addColorStop(0.3, '#fde047');
      sunGrad.addColorStop(0.7, '#f59e0b');
      sunGrad.addColorStop(1, '#b45309');
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.clip();
      for (let i = 0; i < 7; i++) {
        const a = sunRot + (i / 7) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 32 + i * 4, a, a + 0.9);
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Sustainability', cx, cy - 7);
      ctx.fillText('& ESG', cx, cy + 9);
    }

    function loop() {
      draw(frameRef.current);
      frameRef.current += 1;
      animFrameRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [viewMode, hoveredSDG, selectedSDG]);

  const SDG_ALL: SDGData[] = [
    { sdg: 1, name: 'No Poverty', color: '#e5243b', pubs: 12, topFaculty: 'Prof. Lough', pct: 3.0 },
    { sdg: 2, name: 'Zero Hunger', color: '#dda63a', pubs: 8, topFaculty: 'Prof. Lough', pct: 2.0 },
    { sdg: 3, name: 'Good Health', color: '#4c9f38', pubs: 15, topFaculty: 'Prof. Ahsen', pct: 3.8 },
    { sdg: 4, name: 'Quality Education', color: '#c5192d', pubs: 22, topFaculty: 'Prof. Lough', pct: 5.5 },
    { sdg: 5, name: 'Gender Equality', color: '#ff3a21', pubs: 18, topFaculty: 'Prof. Otnes', pct: 4.5 },
    { sdg: 6, name: 'Clean Water', color: '#26bde2', pubs: 3, topFaculty: 'Prof. Mehrotra', pct: 0.8 },
    { sdg: 7, name: 'Clean Energy', color: '#fcc30b', pubs: 45, topFaculty: 'Prof. Fullerton', pct: 11.3 },
    { sdg: 8, name: 'Decent Work', color: '#a21942', pubs: 67, topFaculty: 'Prof. Lough', pct: 16.9 },
    { sdg: 9, name: 'Innovation', color: '#fd6925', pubs: 38, topFaculty: 'Prof. Ahsen', pct: 9.6 },
    { sdg: 10, name: 'Reduced Inequalities', color: '#dd1367', pubs: 52, topFaculty: 'Prof. Ahsen', pct: 13.1 },
    { sdg: 11, name: 'Sustainable Cities', color: '#fd9d24', pubs: 28, topFaculty: 'Prof. Mehrotra', pct: 7.1 },
    { sdg: 12, name: 'Responsible Consumption', color: '#bf8b2e', pubs: 56, topFaculty: 'Prof. Fullerton', pct: 14.1 },
    { sdg: 13, name: 'Climate Action', color: '#3f7e44', pubs: 73, topFaculty: 'Prof. Deryugina', pct: 18.4 },
    { sdg: 14, name: 'Life Below Water', color: '#0a97d9', pubs: 6, topFaculty: 'Prof. Deryugina', pct: 1.5 },
    { sdg: 15, name: 'Life on Land', color: '#56c02b', pubs: 9, topFaculty: 'Prof. Deryugina', pct: 2.3 },
    { sdg: 16, name: 'Peace & Justice', color: '#00689d', pubs: 31, topFaculty: 'Prof. Abdel-Khalik', pct: 7.8 },
    { sdg: 17, name: 'Partnerships', color: '#19486a', pubs: 42, topFaculty: 'Prof. Mahoney', pct: 10.6 },
  ];

  const CHAMPIONS: ChampionData[] = [
    {
      rank: 1,
      medal: '🏆',
      sdg: 13,
      name: 'Climate Action',
      color: '#48773e',
      pubs: 73,
      topFaculty: 'Prof. Deryugina',
      dept: 'Finance',
      blurb: 'Environmental policy & carbon economics',
    },
    {
      rank: 2,
      medal: '🥈',
      sdg: 8,
      name: 'Decent Work & Economic Growth',
      color: '#a21942',
      pubs: 67,
      topFaculty: 'Prof. Lough',
      dept: 'Business Administration',
      blurb: 'Labor markets & organizational behavior',
    },
    {
      rank: 3,
      medal: '🥉',
      sdg: 10,
      name: 'Reduced Inequalities',
      color: '#dd1367',
      pubs: 52,
      topFaculty: 'Prof. Ahsen',
      dept: 'Business Administration',
      blurb: 'AI fairness & healthcare equity',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1 — HERO NETWORK */}
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          height: '70vh',
          minHeight: 400,
          background: 'radial-gradient(ellipse at 50% 60%, #0d2137 0%, #060d14 70%, #000000 100%)',
        }}
      >
        <div className="absolute top-8 left-8 z-10 max-w-md">
          <h2 className="text-3xl font-bold text-white">How Gies Research Connects</h2>
          <p className="mt-1 text-sm text-gray-400">
            97.6% of sustainability research crosses multiple disciplines
          </p>
        </div>
        <svg ref={svgRef} className="absolute inset-0 w-full h-full" />
        {tooltip.visible && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="min-w-[180px] rounded-xl border border-gray-600 bg-gray-900 px-4 py-3 shadow-2xl">
              <p className="text-sm font-bold text-white">{tooltip.title}</p>
              <p className="mt-0.5 text-xs text-gray-400">{tooltip.pubs.toLocaleString()} publications</p>
              {tooltip.susConnected && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-green-400">
                  <span>🌱</span> Connected to SDG research
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2 — STATS CALLOUT BAR */}
      <section ref={statsRef} className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#13294b]">{stat1}</div>
            <div className="mt-1 text-sm text-gray-500">Sustainability Publications</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#13294b]">{stat2}</div>
            <div className="mt-1 text-sm text-gray-500">of All Gies Research</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#13294b]">{stat3}</div>
            <div className="mt-1 text-sm text-gray-500">Growth Since 2010</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#13294b]">{stat4}</div>
            <div className="mt-1 text-sm text-gray-500">UN SDGs Covered</div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TOP 3 CHAMPION CARDS */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Leading SDG Research Areas
          </h2>
          <p className="mt-2 text-center text-slate-600">
            Gies' strongest contributions to the UN Sustainable Development Goals
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CHAMPIONS.map((c) => (
              <Link
                key={c.rank}
                to="/faculty"
                className="group block overflow-hidden rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}dd 100%)`,
                }}
              >
                <div className="p-6 text-white">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-3xl">{c.medal}</span>
                    <span className="text-sm opacity-80">SDG {c.sdg}</span>
                  </div>
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <div className="mt-2 text-5xl font-black">{c.pubs}</div>
                  <div className="text-sm opacity-70">publications</div>
                </div>
                <div
                  className="px-6 py-4"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <div className="text-sm font-medium">👤 {c.topFaculty} · {c.dept}</div>
                  <div className="mt-1 text-xs opacity-80">{c.blurb}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — VIEW TOGGLE + GALAXY / GRID */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          {/* View toggle */}
          <div className="mb-8 flex justify-center gap-2">
            <button
              onClick={() => setViewMode('galaxy')}
              className={`rounded-lg border px-5 py-2 transition-all ${
                viewMode === 'galaxy'
                  ? 'border-gray-600 bg-gray-900 text-white'
                  : 'border-gray-700 bg-transparent text-gray-500 hover:border-gray-600 hover:text-gray-700'
              }`}
            >
              🌌 Galaxy View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-lg border px-5 py-2 transition-all ${
                viewMode === 'grid'
                  ? 'border-gray-600 bg-gray-900 text-white'
                  : 'border-gray-700 bg-transparent text-gray-500 hover:border-gray-600 hover:text-gray-700'
              }`}
            >
              ⊞ Grid View
            </button>
          </div>

          {viewMode === 'grid' ? (
            <>
              <div className="mb-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSdgFilter('all')}
                  className={`rounded-lg border px-5 py-2.5 font-semibold transition ${
                    sdgFilter === 'all'
                      ? 'border-gray-600 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                  }`}
                >
                  🌍 All
                </button>
                <button
                  onClick={() => setSdgFilter('people')}
                  className={`rounded-lg border px-5 py-2.5 font-semibold transition ${
                    sdgFilter === 'people'
                      ? 'border-gray-600 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                  }`}
                >
                  👥 People
                </button>
                <button
                  onClick={() => setSdgFilter('planet')}
                  className={`rounded-lg border px-5 py-2.5 font-semibold transition ${
                    sdgFilter === 'planet'
                      ? 'border-gray-600 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                  }`}
                >
                  🌿 Planet
                </button>
                <button
                  onClick={() => setSdgFilter('prosperity')}
                  className={`rounded-lg border px-5 py-2.5 font-semibold transition ${
                    sdgFilter === 'prosperity'
                      ? 'border-gray-600 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                  }`}
                >
                  💰 Prosperity
                </button>
              </div>

              <div key={sdgFilter} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {SDG_ALL.filter((sdg) => SDG_CATEGORIES[sdgFilter].includes(sdg.sdg)).map((s, idx) => (
                    <Link
                      key={s.sdg}
                      to="/faculty"
                      className="transform cursor-pointer rounded-xl p-4 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110 scale-100 opacity-100"
                      style={{
                        backgroundColor: s.color,
                        animation: 'fadeInUp 400ms ease-out both',
                        animationDelay: `${idx * 40}ms`,
                      }}
                    >
                      <div className="text-xs font-semibold opacity-70">SDG {s.sdg}</div>
                      <div className="mt-1 text-sm font-bold">{s.name}</div>
                      <div className="mt-2 text-4xl font-black">{s.pubs}</div>
                      <div className="text-xs opacity-70">pubs</div>
                      <svg viewBox="0 0 80 45" className="mt-2 h-12 w-full">
                        <path
                          d="M 5,40 A 35,35 0 0,1 75,40"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth={6}
                        />
                        <path
                          d="M 5,40 A 35,35 0 0,1 75,40"
                          fill="none"
                          stroke="white"
                          strokeWidth={6}
                          strokeDasharray={`${(s.pct / 18.4) * 100} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div
                        className="mt-2 rounded px-2 py-1 text-xs font-medium"
                        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                      >
                        👤 {s.topFaculty}
                      </div>
                    </Link>
                  ))}
              </div>
              <p className="mt-4 text-center text-sm text-gray-400">
                {sdgFilter === 'all'
                  ? 'Showing all 17 SDGs'
                  : `Showing ${SDG_CATEGORIES[sdgFilter].length} SDGs — ${sdgFilter.charAt(0).toUpperCase() + sdgFilter.slice(1)} category`}
              </p>
            </>
          ) : (
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 680 }}>
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                onMouseMove={(e) => {
                  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
                  const mx = e.clientX - rect.left;
                  const my = e.clientY - rect.top;
                  let found: number | null = null;
                  for (const p of planetPositionsRef.current) {
                    if (Math.hypot(mx - p.x, my - p.y) < p.r + 10) {
                      found = p.sdg;
                      break;
                    }
                  }
                  setHoveredSDG(found);
                  (e.target as HTMLCanvasElement).style.cursor = found ? 'pointer' : 'default';
                }}
                onClick={(e) => {
                  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
                  const mx = e.clientX - rect.left;
                  const my = e.clientY - rect.top;
                  for (const p of planetPositionsRef.current) {
                    if (Math.hypot(mx - p.x, my - p.y) < p.r + 10) {
                      setSelectedSDG(p.sdg);
                      return;
                    }
                  }
                  setSelectedSDG(null);
                }}
              />
              {selectedSDG !== null &&
                (() => {
                  const p = PLANETS.find((x) => x.sdg === selectedSDG)!;
                  return (
                    <div
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      onClick={() => setSelectedSDG(null)}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                      <div
                        className="relative z-30 w-96 rounded-2xl p-8 shadow-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${p.color}, ${adjustColor(p.color, -40)})`,
                          boxShadow: `0 25px 80px rgba(0,0,0,0.7), 0 0 60px ${p.color}55`,
                          animation: 'planet-card-in 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mb-1 flex items-start justify-between">
                          <span className="text-sm font-semibold text-white/70">SDG {p.sdg}</span>
                          <button
                            onClick={() => setSelectedSDG(null)}
                            className="text-xl leading-none text-white/60 transition-colors hover:text-white"
                          >
                            ✕
                          </button>
                        </div>
                        <h2 className="text-3xl font-black leading-tight text-white">{p.name}</h2>
                        <div className="my-4 border-t border-white/20" />
                        <div className="mb-5 grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-4xl font-black text-white">{p.pubs}</div>
                            <div className="mt-0.5 text-xs text-white/60">publications</div>
                          </div>
                          <div>
                            <div className="text-4xl font-black text-white">#{SDG_RANK[p.sdg]}</div>
                            <div className="mt-0.5 text-xs text-white/60">of 17 SDGs</div>
                          </div>
                          <div>
                            <div className="text-4xl font-black text-white">{SDG_PCT[p.sdg]}%</div>
                            <div className="mt-0.5 text-xs text-white/60">of SDG research</div>
                          </div>
                        </div>
                        <div className="mb-5 rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.25)' }}>
                          <div className="mb-1 text-xs text-white/60">👤 Leading Researcher</div>
                          <div className="text-base font-semibold text-white">{p.topFaculty}</div>
                          <div className="mt-0.5 text-xs text-white/70">{p.dept}</div>
                        </div>
                        <button
                          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all"
                          style={{ background: 'rgba(255,255,255,0.15)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                          onClick={() => navigate('/faculty?sdg=' + p.sdg)}
                        >
                          Explore {p.name} Research →
                        </button>
                      </div>
                    </div>
                  );
                })()}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Ready to Explore Faculty Expertise?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Browse by department, SDG, or research keyword
          </p>
          <Link to="/faculty">
            <button className="rounded-lg bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700">
              Browse All Faculty →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
