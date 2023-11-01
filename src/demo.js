import "./style.css"
import { gsap } from "gsap"
import { Rendering } from "./rendering"
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { palettes, sinPalettes } from "./palettes";
import { getPaletteFromParams, setupControls } from "./utils";

// Colors 
let paletteKey = getPaletteFromParams("blue")

let palette = palettes[paletteKey]
let sinPalette = sinPalettes[paletteKey]

let sinUniforms = {
    c0: new THREE.Uniform(sinPalette.c0),
    c1: new THREE.Uniform(sinPalette.c1),
    c2: new THREE.Uniform(sinPalette.c2),
    c3: new THREE.Uniform(sinPalette.c3),
}

class Demo {
  constructor(){
    this.rendering = new Rendering(document.querySelector("#canvas"), palette)
    this.controls = new OrbitControls(this.rendering.camera, this.rendering.canvas)

    this.uTime = new THREE.Uniform(0)
    this.init()
  }
  init(){
    const box = new THREE.BoxGeometry()
    const mat = new THREE.MeshNormalMaterial()
    const mesh = new THREE.Mesh(box, mat)

    this.rendering.scene.add(mesh)

    this.addEvents()
  }
  addEvents(){
    gsap.ticker.add(this.tick)
  }
  tick = (time, delta)=>{
    this.uTime.value += delta;
    this.rendering.render()
  }
}

let demo = new Demo()

setupControls(paletteKey)
