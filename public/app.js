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

avatarSelect.addEventListener("change", (e) => {
  const avatar = e.target.value;
  loader.load(`./models/${avatar}.glb`, (glb) => {
    const model = glb.scene;
    scene.add(model);
    animate();
  });
});

clothSelect.addEventListener("change", (e) => {
  const cloth = e.target.value;
  loader.load(`./models/${cloth}.glb`, (glb) => {
    const model = glb.scene;
    scene.add(model);
    // these position are for the cloth model to fit
    // we need to make the cloth model itself based on the avatar
    // so we don't need to change the position and rotation
    model.position.set(-0.25, 0.1, 0.1);
    model.scale.set(1.05, 1.05, 1.05);
    const degreesToRotate = THREE.MathUtils.degToRad(110);
    model.rotateY(degreesToRotate);
    animate();
  });
});
