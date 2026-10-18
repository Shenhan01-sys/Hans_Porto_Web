import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GLSL_BAYER, VERTEX_FULLSCREEN, bindFullscreenTriangle, createProgram, rampFloats } from "@/lib/dither";

// The portrait drawn in the same dithered violet light as the hero field.
// It only renders when something changes (load, resize, pointer), so it never loops on its own.

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImg;
uniform vec2 uRes;
uniform vec3 uPtr;
uniform vec3 uRamp[11];
out vec4 fragColor;
${GLSL_BAYER}
void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = fc / uRes;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 d = (uv - uPtr.xy) * aspect;
  float r2 = dot(d, d);
  uv += (d / aspect) * inversesqrt(r2 + 1e-4) * uPtr.z * 0.06 * exp(-r2 * 22.0);
  vec4 c = texture(uImg, vec2(uv.x, 1.0 - uv.y));
  float th = bayer8(ivec2(fc));
  if (c.a < th) discard;
  float lum = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
  lum = clamp(pow(lum, 0.85) * 1.12, 0.0, 1.0);
  float lvl = floor(lum * 9.0 + th) + 1.0;
  int idx = int(clamp(lvl, 1.0, 10.0));
  fragColor = vec4(uRamp[idx], 1.0);
}`;

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function DitherPortrait({ src, alt, width, height, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) {
      setFallback(true);
      return;
    }
    const prog = createProgram(gl, VERTEX_FULLSCREEN, FRAGMENT);
    if (!prog) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);
    const buf = bindFullscreenTriangle(gl);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uPtr = gl.getUniformLocation(prog, "uPtr");
    gl.uniform3fv(gl.getUniformLocation(prog, "uRamp"), rampFloats());
    gl.uniform1i(gl.getUniformLocation(prog, "uImg"), 0);

    const tex = gl.createTexture();
    let ready = false;
    let W = 1;
    let H = 1;
    const ptr = [0.5, 0.5];
    const target = [0.5, 0.5];
    let energy = 0;
    let goal = 0;
    let raf = 0;
    let looping = false;

    const draw = () => {
      if (!ready) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform3f(uPtr, ptr[0], ptr[1], energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const cell = window.innerWidth <= 640 ? 2 : 3;
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width / cell));
      H = Math.max(1, Math.round(r.height / cell));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      gl.viewport(0, 0, W, H);
      gl.uniform2f(uRes, W, H);
      draw();
    };

    const tick = () => {
      ptr[0] += (target[0] - ptr[0]) * 0.18;
      ptr[1] += (target[1] - ptr[1]) * 0.18;
      energy += (goal - energy) * 0.12;
      goal *= 0.94;
      draw();
      if (energy > 0.003 || goal > 0.003) raf = requestAnimationFrame(tick);
      else {
        energy = 0;
        draw();
        looping = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const r = canvas.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
      goal = 1;
      if (!looping) {
        looping = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      ready = true;
      resize();
    };
    img.onerror = () => setFallback(true);
    img.src = src;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [src, reduce]);

  return (
    <div className={className} role="img" aria-label={alt} style={{ aspectRatio: `${width} / ${height}` }}>
      {fallback ? (
        <img src={src} alt="" width={width} height={height} className="h-full w-full object-contain" />
      ) : (
        <canvas ref={ref} aria-hidden="true" className="h-full w-full touch-pan-y" style={{ imageRendering: "pixelated" }} />
      )}
    </div>
  );
}
