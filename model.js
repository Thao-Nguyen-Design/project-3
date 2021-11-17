//copy of /script/script.js, but contain only the "book" model

//import resources
import * as THREE from '/build/three.module.js';

import {
  TrackballControls
} from '/jsm/controls/TrackballControls.js';
import {
  GLTFLoader
} from "/src/GLTFLoader.js";

let perspectiveCamera, controls, scene, renderer, book, group;

// initialization and animation function calls
init();
animate();

// set up scene
function init() {
  //  camera
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
  perspectiveCamera.position.z = 100;
  perspectiveCamera.position.x = 100;

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeceee8);
  scene.fog = new THREE.FogExp2(0xeceee8, 0.002);

  // lights
  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);



  window.addEventListener('resize', onWindowResize);
  createControls(perspectiveCamera);


  //load "book" model
  const loader1 = new GLTFLoader().load(
    "./assets/book.glb",

    function(gltf) {
      // set position and scale
      book = gltf.scene;
      book.position.set(40, -25, 0);
      book.rotation.set(0, 0, 0);
      book.scale.set(15, 15, 15);
      // add model to scene
      scene.add(book);
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

}

function createControls(camera) {

  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.keys = ['KeyA', 'KeyS', 'KeyD'];

}


// animation function
function animate() {

  requestAnimationFrame(animate);

  controls.update();
  render();

}

function render() {

  const camera = perspectiveCamera;

  renderer.render(scene, camera);

}


// window resizing function
function onWindowResize() {

  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.handleResize();

}
