import React, { useEffect, useRef, useState } from 'react';

/**
 * Interactive AI & Technology Canvas Background
 * A high-performance neural network animation with interactive physics.
 */

// --- Constants & Configuration ---
const COLORS = {
  cyan: '#40E0D0',
  orange: '#E8963A',
  teal: 'rgba(0, 206, 209, 0.6)',
  blue: 'rgba(0, 191, 255, 0.5)',
  purple: 'rgba(147, 112, 219, 0.4)',
  gold: 'rgba(255, 215, 0, 0.3)',
  dark: '#0D1117',
  ripple: 'rgba(64, 224, 208, 0.4)',
  bursts: ['#40E0D0', '#E8963A', '#00BFFF', '#FFD700']
};

interface Point {
  x: number;
  y: number;
}

// --- Helper Classes ---

class Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  originalX: number;
  originalY: number;

  constructor(width: number, height: number, color: string) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.originalX = this.x;
    this.originalY = this.y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.baseRadius = Math.random() * 3 + 2;
    this.radius = this.baseRadius;
    this.color = color;
  }

  update(width: number, height: number, mouse: Point | null) {
    // Basic Movement
    this.x += this.vx;
    this.y += this.vy;

    // Boundary check
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse Interaction (Attraction)
    if (mouse) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 1500;
        this.vx += dx * force * 0.1;
        this.vy += dy * force * 0.1;
        this.radius = this.baseRadius * 1.5;
      } else {
        this.radius = this.baseRadius;
      }
    }

    // Friction to prevent infinite acceleration from mouse interaction
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1.0;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.life;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 150;
    this.life = 1.0;
  }

  update() {
    this.radius += 4;
    this.life -= 0.015;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(64, 224, 208, ${this.life})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

class Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  type: 'hex' | 'tri' | 'sq';

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 30 + 20;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    const types: ('hex' | 'tri' | 'sq')[] = ['hex', 'tri', 'sq'];
    this.type = types[Math.floor(Math.random() * types.length)];
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    if (this.x < -50) this.x = width + 50;
    if (this.x > width + 50) this.x = -50;
    if (this.y < -50) this.y = height + 50;
    if (this.y > height + 50) this.y = -50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.strokeStyle = COLORS.purple;
    ctx.lineWidth = 1;

    if (this.type === 'tri') {
      for (let i = 0; i < 3; i++) {
        const x = this.size * Math.cos((i * 2 * Math.PI) / 3);
        const y = this.size * Math.sin((i * 2 * Math.PI) / 3);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    } else if (this.type === 'sq') {
      ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else {
      for (let i = 0; i < 6; i++) {
        const x = this.size * Math.cos((i * 2 * Math.PI) / 6);
        const y = this.size * Math.sin((i * 2 * Math.PI) / 6);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

class BinaryRain {
  x: number;
  y: number;
  value: string;
  speed: number;
  fontSize: number;

  constructor(width: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * -500;
    this.value = Math.random() > 0.5 ? '1' : '0';
    this.speed = Math.random() * 1 + 0.5;
    this.fontSize = Math.floor(Math.random() * 10 + 10);
  }

  update(height: number) {
    this.y += this.speed;
    if (this.y > height) {
      this.y = -20;
      this.value = Math.random() > 0.5 ? '1' : '0';
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(64, 224, 208, 0.05)';
    ctx.font = `${this.fontSize}px monospace`;
    ctx.fillText(this.value, this.x, this.y);
  }
}

// --- Main Component ---

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number>(0);
  
  // State for interaction
  const mouse = useRef<Point | null>(null);
  const nodes = useRef<Node[]>([]);
  const bursts = useRef<BurstParticle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const shapes = useRef<Shape[]>([]);
  const binary = useRef<BinaryRain[]>([]);

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Responsive element counts
    const isMobile = width < 768;
    const nodeCount = isMobile ? 40 : 80;
    const shapeCount = isMobile ? 6 : 12;
    const binaryCount = isMobile ? 0 : 30;

    nodes.current = Array.from({ length: nodeCount }, () => 
      new Node(width, height, Math.random() > 0.2 ? COLORS.cyan : COLORS.orange)
    );
    shapes.current = Array.from({ length: shapeCount }, () => new Shape(width, height));
    binary.current = Array.from({ length: binaryCount }, () => new BinaryRain(width));
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const maxDist = 180;
    const pulse = Math.sin(Date.now() / 1000) * 0.2 + 0.8;

    for (let i = 0; i < nodes.current.length; i++) {
      for (let j = i + 1; j < nodes.current.length; j++) {
        const n1 = nodes.current[i];
        const n2 = nodes.current[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.4 * pulse;
          
          // Influence of mouse on connection glow
          let lineAlpha = alpha;
          if (mouse.current) {
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const mdx = mouse.current.x - midX;
            const mdy = mouse.current.y - midY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 100) lineAlpha = alpha * 2;
          }

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(64, 224, 208, ${lineAlpha})`;
          ctx.lineWidth = (1 - dist / maxDist) * 1.5;
          ctx.stroke();
        }
      }
    }
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const step = 60;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(64, 224, 208, 0.03)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear with dark blue tint
    ctx.fillStyle = COLORS.dark;
    ctx.fillRect(0, 0, width, height);

    // 1. Grid Background
    drawGrid(ctx, width, height);

    // 2. Binary Rain
    binary.current.forEach(b => {
      b.update(height);
      b.draw(ctx);
    });

    // 3. Geometric Shapes
    shapes.current.forEach(s => {
      s.update(width, height);
      s.draw(ctx);
    });

    // 4. Connections
    drawConnections(ctx, width, height);

    // 5. Nodes
    nodes.current.forEach(node => {
      node.update(width, height, mouse.current);
      node.draw(ctx);
    });

    // 6. Ripples
    ripples.current = ripples.current.filter(r => r.life > 0);
    ripples.current.forEach(r => {
      r.update();
      r.draw(ctx);
    });

    // 7. Bursts
    bursts.current = bursts.current.filter(b => b.life > 0);
    bursts.current.forEach(b => {
      b.update();
      b.draw(ctx);
    });

    // 8. Hover Glow
    if (mouse.current) {
      const gradient = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 150
      );
      gradient.addColorStop(0, 'rgba(64, 224, 208, 0.15)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  // Event Handlers
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    mouse.current = { x, y };
  };

  const handleClick = (e: MouseEvent | TouchEvent) => {
    const x = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const y = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

    // Create ripple
    ripples.current.push(new Ripple(x, y));

    // Create burst particles
    for (let i = 0; i < 15; i++) {
      bursts.current.push(new BurstParticle(x, y, COLORS.bursts[Math.floor(Math.random() * COLORS.bursts.length)]));
    }

    // Repulse nodes
    nodes.current.forEach(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 20;
        n.vx += (dx / dist) * force;
        n.vy += (dy / dist) * force;
      }
    });
  };

  useEffect(() => {
    init();
    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => init();
    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(requestRef.current);
      else requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('touchstart', handleClick);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchstart', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#0D1117] -z-10"
      style={{ touchAction: 'none' }}
    >
      <canvas 
        ref={canvasRef} 
        className="block pointer-events-none"
      />
    </div>
  );
};

export default BackgroundAnimation;