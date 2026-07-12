/** Shared GLSL: value noise + fbm, kept cheap for 60fps on integrated GPUs. */
const NOISE = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.1 + vec3(11.7, 5.3, 7.9);
      a *= 0.5;
    }
    return v;
  }
`;

export const planetVertex = /* glsl */ `
  varying vec3 vObjPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vObjPos = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const planetFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uAtmosphere;
  uniform float uTime;
  uniform float uHover;
  uniform int uStyle; // 0 structured · 1 modular · 2 warm · 3 translucent · 4 network

  varying vec3 vObjPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  ${NOISE}

  void main() {
    vec3 p = normalize(vObjPos);
    float t = uTime * 0.02;
    vec3 col;
    float glow = 0.0;

    if (uStyle == 0) {
      // Structured: terraced continents with glowing network seams.
      float n = fbm(p * 3.5);
      float terraces = floor(n * 5.0) / 5.0;
      col = mix(uColorA, uColorB, terraces);
      float seams = smoothstep(0.02, 0.0, abs(fract(n * 5.0) - 0.5) - 0.42);
      glow = seams * 0.9;
      col += uColorC * seams * 0.8;
    } else if (uStyle == 1) {
      // Modular: assembled panels with lit joints.
      vec2 grid = vec2(atan(p.z, p.x) * 2.2, p.y * 4.0);
      vec2 cell = fract(grid) - 0.5;
      float cellId = noise(vec3(floor(grid), 3.7));
      float edge = smoothstep(0.42, 0.5, max(abs(cell.x), abs(cell.y)));
      col = mix(uColorA, uColorB, cellId);
      col = mix(col, uColorC, edge * 0.85);
      glow = edge * 0.6 + smoothstep(0.75, 1.0, cellId) * 0.25;
    } else if (uStyle == 2) {
      // Warm: slow, banded flows — domain-warped like weathered clouds.
      vec3 warp = vec3(fbm(p * 2.0 + t), fbm(p * 2.0 + 5.2 - t), fbm(p * 2.0 + 9.1));
      float bands = fbm(p * 2.6 + warp * 1.4 + vec3(0.0, p.y * 2.4, 0.0));
      col = mix(uColorA, uColorB, smoothstep(0.2, 0.75, bands));
      col = mix(col, uColorC, smoothstep(0.68, 0.95, bands) * 0.85);
      glow = smoothstep(0.7, 0.95, bands) * 0.4;
    } else if (uStyle == 3) {
      // Translucent: drifting neural filaments inside a glassy shell.
      float f1 = fbm(p * 4.0 + vec3(t * 6.0, 0.0, 0.0));
      float filaments = smoothstep(0.06, 0.0, abs(f1 - 0.5) - 0.02);
      col = mix(uColorA, uColorB, f1);
      col += uColorC * filaments * 1.4;
      glow = filaments * 1.1 + 0.15;
    } else {
      // Network: dark slate world webbed with luminous connection lines
      // and node points — a system linking many places into one.
      float base = fbm(p * 2.2);
      col = mix(uColorA, uColorB, base);
      float w1 = abs(fbm(p * 3.1) - 0.5);
      float w2 = abs(fbm(p * 6.3 + 4.7) - 0.5);
      float web = smoothstep(0.028, 0.0, w1 - 0.008) + smoothstep(0.02, 0.0, w2 - 0.006) * 0.6;
      float nodes = smoothstep(0.88, 0.97, noise(p * 9.0 + 2.3));
      col += uColorC * web * 0.9;
      col += uColorC * nodes * 1.3;
      glow = web * 0.8 + nodes * 1.2;
    }

    // Sun light from the origin + a camera-side fill so the hemisphere the
    // visitor is shown never collapses into unreadable shadow.
    vec3 L = normalize(-vWorldPos);
    vec3 N = normalize(vNormal);
    vec3 V0 = normalize(cameraPosition - vWorldPos);
    float light = max(dot(N, L), 0.0) * 0.6 + max(dot(N, V0), 0.0) * 0.38 + 0.16;
    col *= light;
    col += col * glow * 0.5;

    // Atmospheric rim, boosted on hover.
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(V, N), 0.0), 2.6);
    col += uAtmosphere * fresnel * (0.55 + uHover * 0.9);

    float alpha = uStyle == 3 ? 0.92 : 1.0;
    gl_FragColor = vec4(col, alpha);
  }
`;

export const sunVertex = planetVertex;

export const sunFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vObjPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  ${NOISE}

  void main() {
    vec3 p = normalize(vObjPos);
    float t = uTime * 0.05;
    vec3 warp = vec3(fbm(p * 3.0 + t), fbm(p * 3.0 + 7.3 - t), fbm(p * 3.0 + 3.1 + t * 0.5));
    float n = fbm(p * 4.0 + warp * 1.6);

    vec3 deep = vec3(0.72, 0.32, 0.08);
    vec3 mid = vec3(0.95, 0.62, 0.22);
    vec3 bright = vec3(1.0, 0.88, 0.58);
    vec3 col = mix(deep, mid, smoothstep(0.25, 0.6, n));
    col = mix(col, bright, smoothstep(0.62, 0.9, n));

    // Limb brightening for a living-corona edge.
    vec3 V = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - max(dot(V, normalize(vNormal)), 0.0), 1.8);
    col += vec3(1.0, 0.75, 0.4) * rim * 0.9;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/** Soft fresnel shell rendered on a slightly larger back-face sphere. */
export const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vec3 V = normalize(cameraPosition - vWorldPos);
    float glow = pow(max(dot(V, normalize(vNormal)), 0.0), 2.4);
    gl_FragColor = vec4(uColor, glow * uIntensity);
  }
`;

/** Radial halo billboard (used behind the sun). */
export const haloVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = pow(smoothstep(1.0, 0.0, d), 2.6);
    gl_FragColor = vec4(uColor, a * 0.55);
  }
`;

export const ringVertex = /* glsl */ `
  varying vec3 vObjPos;
  void main() {
    vObjPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const ringFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uInner;
  uniform float uOuter;
  varying vec3 vObjPos;

  ${NOISE}

  void main() {
    float r = length(vObjPos.xy);
    float band = (r - uInner) / (uOuter - uInner);
    float n = noise(vec3(band * 26.0, 0.0, 0.0)) * 0.6 + noise(vec3(band * 90.0, 3.0, 0.0)) * 0.4;
    float edges = smoothstep(0.0, 0.12, band) * smoothstep(1.0, 0.82, band);
    gl_FragColor = vec4(uColor, n * edges * 0.5);
  }
`;
