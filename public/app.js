import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

const loader = new GLTFLoader();

// Animation and rendering loop
const animate = () => {
  requestAnimationFrame(animate);

  // Add any animation or interaction logic here

  renderer.render(scene, camera);
};

animate();

// check whenever option is changed in any of the select
// and change the model accordingly
const avatarSelect = document.getElementById("avatar-select");
const clothSelect = document.getElementById("cloth-select");
const colorSelect = document.getElementById("color-select");
const sizeSelect = document.getElementById("size-select");

let currentAvatar = null;
let currentCloth = null;

avatarSelect.addEventListener("change", (e) => {
  const avatar = e.target.value;
  if (currentAvatar) {
    scene.remove(currentAvatar);
  }
  loader.load(`./models/${avatar}.glb`, (glb) => {
    currentAvatar = glb.scene;
    scene.add(currentAvatar);
    animate();
  });
});

clothSelect.addEventListener("change", changeCloth);

const changeCloth = () => {
  const cloth = clothSelect.value;
  const color = colorSelect.value;
  const size = sizeSelect.value;
  if (currentCloth) {
    scene.remove(currentCloth);
  }
  loader.load(`./models/${color}_${size}_${cloth}.glb`, (glb) => {
    currentCloth = glb.scene;
    scene.add(currentCloth);
    currentCloth.position.set(-0.25, 0.1, 0.1);
    currentCloth.scale.set(1.05, 1.05, 1.05);
    const degreesToRotate = THREE.MathUtils.degToRad(110);
    currentCloth.rotateY(degreesToRotate);
    animate();
  });
};
