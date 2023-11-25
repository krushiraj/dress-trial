# Explanation of the app

## Description
This explains through the code how the app works.

```js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
```

These are the imports of the required libraries.
`three.js` - the main library that is used to render the 3d models and the scene

```js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fbcd4);
```

This creates a new scene and sets the background color to a light blue color.

```js
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
```

This creates a new camera and sets the position and the look at point of the camera. Also adds an ambient light to the scene (which is required, without which we cannot have a clear look on the models rendered in the scene).

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);
```

This creates a new renderer and sets the size of the renderer to the size of the window. Also appends the renderer to the `scene-container` div in the html file.

```js
// controls for orbiting around the model
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});
controls.target.set(0, 1, 0);
controls.update();
```

This creates a new orbit controls object and sets the target to the origin of the model. Also updates the controls. This is used to orbit around the model. Like moving the camera around the model. Zooming in and out of the model.

```js
// Animation and rendering loop
const animate = () => {
  requestAnimationFrame(animate);

  // Add any animation or interaction logic here

  renderer.render(scene, camera);
};

animate();
```

This is the animation loop. This is where we can add any animation or interaction logic. This is called every frame. So any changes made here will be reflected in the next frame.

```js
const avatarSelect = document.getElementById("avatar-select");
const clothSelect = document.getElementById("cloth-select");
const colorSelect = document.getElementById("color-select");
const sizeSelect = document.getElementById("size-select");
```

These are the select elements in the html file. These are used to select the model, dress, color and size.

```js
let currentCloth = null;
const loader = new GLTFLoader();
```

This is the current cloth variable. This is used to store the current cloth that is rendered in the scene. This is also used to remove the cloth from the scene when the same size is selected again.

```js
const changeCloth = () => {
  const avatar = avatarSelect.value;
  const cloth = clothSelect.value;
  const color = colorSelect.value;
  const size = sizeSelect.value;
  if (currentCloth) {
    scene.remove(currentCloth);
  }
  // check if color, size and cloth are not none
  if (avatar === "none" || cloth === "none" || color === "none" || size === "none") {
    return;
  }
  loader.load(`./models/${avatar}_${color}_${size}_${cloth}.glb`, (glb) => {
    currentCloth = glb.scene;
    scene.add(currentCloth);
    currentCloth.position.set(-0.25, -0.9, 0.3);
    currentCloth.scale.set(2, 2, 2);
    animate();
  });
};
```

This is the change cloth function. This is called when any of the select elements are changed. This is used to change the cloth in the scene. This removes the current cloth from the scene and loads the new cloth and adds it to the scene.

```js
clothSelect.addEventListener("change", changeCloth);
colorSelect.addEventListener("change", changeCloth);
sizeSelect.addEventListener("change", changeCloth);
```

These are the event listeners for the select elements. These are used to call the change cloth function when any of the select elements are changed.

## Explaining the index.html file

```html
<div style="display: flex; flex-direction: column; height: 100vh">
      <div style="display: flex; flex-direction: row; height: 100%">
        <select id="avatar-select" style="width: 200px; height: 100%">
          <!-- options for avatars -->
          <option value="none">None</option>
          <option value="avatar">Model 1</option>
        </select>
        <select id="cloth-select" style="width: 200px; height: 100%">
          <!-- options for clothes -->
          <option value="none">None</option>
          <option value="tshirt">T-Shirt</option>
        </select>
        <select id="color-select" style="width: 200px; height: 100%">
          <!-- options for colors -->
          <option value="none">None</option>
          <option value="purple">Purple</option>
        </select>
        <select id="size-select" style="width: 200px; height: 100%">
          <!-- options for sizes -->
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
      <div id="scene-container"></div>
    </div>

    <script src="dist/bundle.js"></script>
```

This is the html file. This contains the select elements and the div to which the renderer is appended.
`<div id="scene-container"></div>` - this is the div to which the renderer is appended.
`<script src="dist/bundle.js"></script>` - this is the script tag that loads the bundle.js file. This is the file that is generated by webpack. This contains all the code that is required to run the app.
`<select>` - these are the select elements. These are used to select the model, dress, color and size.