import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import FBXLoader from "three-fbxloader-offical";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fbcd4);

// Create and position the camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);
camera.lookAt(0, 0, 0); // Set the camera to look at the model's origin

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);

// controls for orbiting around the model
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});
controls.target.set(0, 1, 0);
controls.update();

// Load the FBX model
const loader = new GLTFLoader();
loader.load(
  "./models/jane.glb",
  (glb) => {
    const model = glb.scene;
    scene.add(model);
  }
);

// Animation and rendering loop
const animate = () => {
  requestAnimationFrame(animate);

  // Add any animation or interaction logic here

  renderer.render(scene, camera);
};

animate();
