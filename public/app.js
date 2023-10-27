import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import FBXLoader from "three-fbxloader-offical";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);

// Create and position the camera
camera.position.set(0, 2, 5);

// Create and position lights
const directionalLight = new THREE.DirectionalLight(0x000000, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

let avatar;
let clothing;

// Load the avatar model
const avatarLoader = new FBXLoader();
avatarLoader.load('./models/body.fbx', (fbx) => {
    avatar = fbx;
    scene.add(avatar);
    avatar.position.set(0, 0, 0); // Position the human model
    avatar.scale.set(0.02, 0.02, 0.02); // Scale the human model if needed
});

// Load the clothing model
// const clothingLoader = new FBXLoader();
// clothingLoader.load('./models/hoodie.fbx', (fbx) => {
//     clothing = fbx;
//     if (avatar) {
//         // Position the clothing on the human model
//         // You may need to adjust the position, rotation, and scale
//         clothing.position.set(0, 1.5, 0);
//         avatar.add(clothing);
//     }
// });

// Animation and rendering loop
const animate = () => {
    requestAnimationFrame(animate);

    if (avatar && clothing) {
        // Add animation or physics logic to drape the clothing realistically
        // For a simple example, you can rotate the clothing slightly to simulate movement
        clothing.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
};

animate();
