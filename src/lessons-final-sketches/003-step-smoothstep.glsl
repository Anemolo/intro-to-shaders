precision highp float;

varying vec2 vUv;
uniform float uTime;

float square(vec2 uv, float size){
	float halfSize = size/2.;
	float left   = step(0.5 - halfSize, uv.x);
	float right  = step(uv.x, 0.5 + halfSize);

	float top    = step(0.5 - halfSize, uv.y);
	float bottom = step(uv.y, 0.5 + halfSize );

  return left * right * top * bottom;
}

  vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){
    return a + b*cos( 6.28318*(c*t+d) );
  }
void main(){
  vec3 color = vec3(0.);
  float result = 0.;
  vec2 uv = vUv;


vec2 circlePos = vec2(cos(uTime ), sin(uTime )) * 0.2 ;
float sizeChange = sin(uTime) * 0.2;

float circleGradient = distance(vec2(0.5), uv + circlePos);
float circle = smoothstep( 0.2 + sizeChange, 0.4 + sizeChange,  distance(vec2(0.5), uv + circlePos));

  result = circle;
  color = vec3(result);
//   vec3 red = vec3(1.,0.,0.);
// vec3 blue = vec3(0., 0., 1.);
// vec3 redToBlueSplit = mix(red, blue, step(0.5, uv.x) );
//
// vec3 green = vec3(0., 1., 0.);
// color = mix(redToBlueSplit, green, uv.y);
// color = redToBlueSplit + green * uv.y;
  // color = palette(result * .2 + 0.5, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25));
  gl_FragColor = vec4(color, 1.0);
}
