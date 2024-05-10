uniform sampler2D uGrassTexture;
uniform sampler2D uCloudTexture;

varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;

void main() {
  float contrast = 1.5;
  float brightness = 0.1;
  vec3 color = texture2D(uGrassTexture, vUv).rgb * contrast;
  color = color + vec3(brightness, brightness, brightness);
  color = mix(color, texture2D(uCloudTexture, cloudUV).rgb, 0.2);
  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.;

  // #include <tonemapping_fragment>
  // #include <encodings_fragment>
}
