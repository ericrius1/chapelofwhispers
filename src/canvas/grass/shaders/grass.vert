varying vec2 vUv;
varying vec2 cloudUV;

varying vec3 vColor;
uniform float uTime;

void main() {
  vUv = uv;
  cloudUV = uv;
  vColor = color;
  vec3 cpos = position;

  float waveSize =2.0f;
  float tipDistance = 0.3f;
  float centerDistance = 0.1f;

  if (color.x > 0.6f) {
    cpos.x += sin((uTime / 5000.) + (uv.x * waveSize)) * tipDistance;
  }else if (color.x > 0.0f) {
    cpos.x += sin((uTime / 5000.) + (uv.x * waveSize)) * centerDistance;
  }

  float diff = position.x - cpos.x;

  cloudUV = vec2(
    cloudUV.x + sin(uTime / 100000.),
    cloudUV.y + cos(uTime / 100000.)
  );
  cloudUV *= 1.0 + 0.1 * sin(uTime / 100000.);

  vec4 worldPosition = vec4(cpos, 1.);
  vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(cpos, 1.0);
  gl_Position = mvPosition;
}
