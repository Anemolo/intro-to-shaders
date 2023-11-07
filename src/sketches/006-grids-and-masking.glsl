precision highp float;

varying vec2 vUv;
uniform float uTime;

float normalSin(float val){
		return sin(val) * 0.5 + 0.5;
}

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){
  return a + b*cos( 6.28318*(c*t+d) );
}

float square(vec2 uv, float size){
	float halfSize = size/2.;
	float left   = step(0.5 - halfSize, uv.x);
	float right  = step(uv.x, 0.5 + halfSize);

	float top    = step(0.5 - halfSize, uv.y);
	float bottom = step(uv.y, 0.5 + halfSize );

  return left * right * top * bottom;
}

vec3 backgroundSketch(){

  vec2 uv = vUv;
  float gridSize = 20.;
  uv *= gridSize;
  uv = fract(uv);

  vec2 gridIndex = floor(vUv * gridSize + uTime);
  gridIndex = floor(vUv * gridSize );


	float distToCenter = distance(vec2(gridSize/2. - 0.5), gridIndex);
  float size =  0.3 + 0.3* sin(distToCenter - uTime * 4. );
  float sq = square(uv, size);
  
  float paletteOffset = vUv.x * 0.2 + uTime * 0.2;

  return sq * palette(paletteOffset, vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25));

}
// The most basic shader
void main(){
  vec3 color = vec3(1.);
  vec2 uv = vUv;
  float result = 0.;


  uv.x = normalSin(uv.x * 10.);
  uv.y = normalSin(uv.y * 10.);

  float gridSize = 10.;
  uv *= gridSize;
  uv = fract(uv);

  vec2 gridIndex = floor(vUv * gridSize + uTime);
   gridIndex = floor(vUv * gridSize );

  float angle = uTime + gridIndex.x + gridIndex.y;
  vec2 pos = vec2(cos(angle), sin(angle)) * 0.2;
  float sizeChange = sin(uTime * 4. + distance(vec2(gridSize / 2. - 0.5), gridIndex) * 1.) * 0.4;


  float circle = smoothstep( 0.2 + sizeChange, 0.4 + sizeChange,  distance(vec2(0.5), uv + pos));
  result += circle;

  float paletteOffset = distance(vec2(gridSize/2.-0.5), gridIndex) * 0.1+ uTime * 0.2;
  result = 1.-result;

  vec3 sketch1 = palette(paletteOffset ,vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25));


  // Masking

  color = mix(backgroundSketch(), sketch1, result);

  gl_FragColor = vec4(color, 1.0);
}
