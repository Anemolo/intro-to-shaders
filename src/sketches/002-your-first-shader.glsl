precision highp float;

varying vec2 vUv;
uniform float uTime;

void main(){
  vec3 color = vec3(1.);

  // red
  color = vec3(1.,0.,0.);

  // blue only half-screen
  if(vUv.x > 0.5){
      color = vec3(0.,0.,1.);
  }


  gl_FragColor = vec4(color, 1.0);
}
