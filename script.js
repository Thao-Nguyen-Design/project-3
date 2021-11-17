// import three JS

import * as THREE from "./build/three.module.js";

import {
  TrackballControls
} from './src/TrackballControls.js';
  import {
    GLTFLoader
  } from "./src/GLTFLoader.js";

let perspectiveCamera, controls, scene, renderer, book, pages, group;

// initialization and animation function calls
init();
animate();

// initialize the scene
function init() {

  //camera
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
  perspectiveCamera.position.z = 100;

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
    "/assets/book.glb",
    function(gltf) {

      // set position and scale
      book = gltf.scene;
      book.position.set(0, -80, 0);
      book.rotation.set(0, 0, 0);
      book.scale.set(20, 20, 20);
      // add model to scene
      scene.add(book);

    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

  //calling function to load page models (function below)
  addGLTFmodel();
  //add model group to scene
  scene.add(group);

}

//load "page" model
function addGLTFmodel() {
  //create a group of objects
  group = new THREE.Group();

  const loader2 = new GLTFLoader();
  //create 300 objects of "page" model
  for (let i = 0; i < 300; i++) {
    loader2.load(
      "/assets/page.glb",
      function(gltf) {
        pages = gltf.scene;
        // pages.position.x = (Math.random() * 20 - 10) * 20;
        // pages.position.y = (Math.random() * 20) * 20 - 20;
        // pages.position.z = (Math.random() * 20 - 10) * 20;

        //make each object has random position and angle
        pages.position.x = (Math.random() - 0.5) * 1000;
        pages.position.y = (Math.random() - 0.5) * 1000;
        pages.position.z = (Math.random() - 0.5) * 1000;

        pages.rotation.x = (Math.random() * 360) * Math.PI / 180;
        pages.rotation.y = (Math.random() * 360) * Math.PI / 180;
        pages.rotation.z = (Math.random() * 360) * Math.PI / 180;
        //set scale for object
        pages.scale.set(30, 30, 30);
        //add object to group
        group.add(pages);
      }
    );
  }
  return group;
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

  //animate model group (contains "page" model)
  group.rotation.x += 0.1;
  group.rotation.z += 0.1;
  group.rotation.y += 0.1;

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
