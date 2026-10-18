import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { GLSL_BAYER, VERTEX_FULLSCREEN, bindFullscreenTriangle, createProgram, rampFloats } from "@/lib/dither";

// Hero field: a warped plasma read as light, ordered-dithered into the 11-level violet ramp.
// One canvas pixel = one dither cell (4 CSS px, 3 on phones), stretched with pixelated rendering.
// 30fps idle, 60fps while the pointer pushes it, paused offscreen, on hidden tabs and under reduced motion.

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uPtr;
uniform vec3 uRamp[11];
out vec4 fragColor;
${GLSL_BAYER}
float field(vec2 uv, float t){
  vec2 q = uv * 1.35;
  for (int k = 0; k < 6; k++){
    float fk = float(k);
    q += 0.32 * vec2(sin(q.y * 1.9 + t * 0.9 + fk * 1.3), cos(q.x * 1.7 - t * 0.7 + fk * 2.1));
  }
  float v = 0.5 + 0.5 * sin(q.x * 1.1 + q.y * 0.8 + t * 0.6);
  v *= 0.55 + 0.45 * sin(length(q) * 1.3 - t * 0.5);
  return clamp(v, 0.0, 1.0);
}
void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = (fc - 0.5 * uRes) / uRes.y;
  vec2 d = uv - uPtr.xy;
  float r2 = dot(d, d);
  uv += d * inversesqrt(r2 + 1e-4) * uPtr.z * 0.16 * exp(-r2 * 9.0);
  float lum = field(uv, uTime);
  vec2 n = fc / uRes;
  float light = smoothstep(-0.15, 1.0, n.x * 0.75 + n.y * 0.85 - 0.25);
  lum = pow(lum, 1.35) * (0.16 + 0.95 * light);
  float lvl = floor(clamp(lum, 0.0, 1.0) * 10.0 + bayer8(ivec2(fc)));
  int idx = int(clamp(lvl, 0.0, 10.0));
  fragColor = vec4(uRamp[idx], 1.0);
}`;

const T0 = 8.0;
const SPEED = 0.22;

export function DitherField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement ?? canvas;
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false, desynchronized: true });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }
    const prog = createProgram(gl, VERTEX_FULLSCREEN, FRAGMENT);
    if (!prog) return;
    gl.useProgram(prog);
    const buf = bindFullscreenTriangle(gl);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uPtr = gl.getUniformLocation(prog, "uPtr");
    gl.uniform3fv(gl.getUniformLocation(prog, "uRamp"), rampFloats());

    let cell = 4;
    let W = 1;
    let H = 1;
    const target = [0.4, 0.2];
    const ptr = [0.4, 0.2];
    let energy = 0;
    let goal = 0;
    let lastT = T0;
    let lastFrame = 0;
    let startT = performance.now();
    let running = false;
    let visible = true;
    let raf = 0;

    const draw = (t: number) => {
      gl.uniform1f(uTime, t);
      gl.uniform3f(uPtr, ptr[0], ptr[1], energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      cell = window.innerWidth <= 640 ? 3 : 4;
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width / cell));
      H = Math.max(1, Math.round(r.height / cell));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      gl.viewport(0, 0, W, H);
      gl.uniform2f(uRes, W, H);
    };

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      ptr[0] += (target[0] - ptr[0]) * 0.12;
      ptr[1] += (target[1] - ptr[1]) * 0.12;
      energy += (goal - energy) * 0.06;
      goal *= 0.985;
      const interval = energy > 0.02 ? 1000 / 60 : 1000 / 30;
      if (now - lastFrame < interval) return;
      lastFrame = now;
      lastT = T0 + ((now - startT) / 1000) * SPEED;
      draw(lastT);
    };

    const wake = () => {
      if (running || !visible || reduce || document.hidden) return;
      running = true;
      startT = performance.now() - ((lastT - T0) / SPEED) * 1000;
      raf = requestAnimationFrame(frame);
    };
    const sleep = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const px = (e.clientX - r.left) / cell;
      const py = (r.height - (e.clientY - r.top)) / cell;
      target[0] = (px - 0.5 * W) / H;
      target[1] = (py - 0.5 * H) / H;
      goal = 1;
      wake();
    };
    const onLeave = () => {
      goal = 0;
    };
    const onVisibility = () => (document.hidden ? sleep() : wake());

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(lastT);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) wake();
        else sleep();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);
    if (!reduce) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    draw(lastT);
    wake();

    return () => {
      sleep();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className={className} style={{ imageRendering: "pixelated" }} />;
}
