precision highp float;

varying vec2 vUv;
uniform float uTime;

float normalSin(float val){
		return sin(val) * 0.5 + 0.5;
}

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){
  return a + b*cos( 6.28318*(c*t+d) );
}
// The most basic shader
void main(){
  vec3 color = vec3(1.);
  vec2 uv = vUv;
  float result = 0.;

  uv.x = normalSin(uv.x * 10.);
  uv.y = normalSin(uv.y * 10.);

  vec2 pos = vec2(cos(uTime ), sin(uTime )) * 0.2 ;
  float sizeChange = sin(uTime * 2.) * 0.2;

  float circle = smoothstep( 0.2 + sizeChange, 0.4 + sizeChange,  distance(vec2(0.5), uv + pos));
  result += circle;

  float paletteOffset = vUv.x * 0.3 + vUv.y  + uTime * 0.2;
  result = 1.-result;
  color = (result) * palette(paletteOffset, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25));

  gl_FragColor = vec4(color, 1.0);
}
