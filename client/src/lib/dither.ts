// Shared pieces of the violet dither language (MASTER section 5, "Field").

/** 11 light levels, from the ground to Mist. */
export const RAMP = [
  "#040008", "#120023", "#240046", "#3C096C", "#5A189A", "#6D0CCD",
  "#7F00FF", "#9E61FF", "#C49DFF", "#EBDBFF", "#FCFAFF",
];

export function rampFloats(): Float32Array {
  const out: number[] = [];
  for (const hex of RAMP) {
    const h = hex.slice(1);
    out.push(parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255);
  }
  return new Float32Array(out);
}

/** 8x8 ordered Bayer threshold in GLSL ES 3.00, returns 0..1. */
export const GLSL_BAYER = `
float bayer8(ivec2 p){
  int x = p.x & 7; int y = p.y & 7; int xy = x ^ y;
  int v = ((xy & 1) << 5) | ((x & 1) << 4) | ((xy & 2) << 2) | ((x & 2) << 1) | ((xy & 4) >> 1) | ((x & 4) >> 2);
  return (float(v) + 0.5) / 64.0;
}`;

export const VERTEX_FULLSCREEN = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

export function createProgram(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram | null {
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  };
  const v = compile(gl.VERTEX_SHADER, vs);
  const f = compile(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.bindAttribLocation(prog, 0, "aPos");
  gl.linkProgram(prog);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

/** One triangle that covers the viewport. */
export function bindFullscreenTriangle(gl: WebGL2RenderingContext) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  return buf;
}
