import "./style.css"
import { gsap } from "gsap"
import { Rendering } from "./rendering"
import * as THREE from "three";

import {  catchThreeJSErrors,  setupSketchControls } from "./utils";

// -- Sketch management trickery
//

const sketches = import.meta.glob('./sketches/*.glsl',{ as: 'raw', eager: true })
let filenames = Object.keys(sketches).map(path => path.split(/[\\/]/).pop())

let search = new URLSearchParams(window.location.search)
 let selectedSketch = search.get("filename") == null ? filenames[0] : search.get("filename") 

let filenameEle = document.querySelector("#filename")
filenameEle.innerText = selectedSketch

setupSketchControls(selectedSketch, filenames)

catchThreeJSErrors()

// -- Actual rendering stuff
//

let rendering = new Rendering(document.querySelector("#canvas"))

let uTime = new THREE.Uniform(0)

const plane = new THREE.PlaneGeometry()
const fullscreenMaterial = new THREE.RawShaderMaterial({
  vertexShader: glsl`
     precision highp float;
    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vUv;
    void main(){ 
      vec3 transformed = position;
      transformed.xy *= 2.;
      vUv = uv;
      gl_Position = vec4(transformed, 1.);
    }
`,
  fragmentShader: sketches["./sketches/"+selectedSketch],
  uniforms: {
    uTime: uTime
  }
})
const mesh = new THREE.Mesh(plane, fullscreenMaterial)

rendering.scene.add(mesh)

function tick (time, delta){
  uTime.value += delta * 0.001;
  rendering.render()
}

gsap.ticker.add(tick)

