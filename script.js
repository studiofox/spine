const scene = new THREE.Scene();


// Sizes -------------------------------------------------
const sizes = { width: window.innerWidth, height: window.innerHeight };



const textureLoader = new THREE.TextureLoader();

// adding point light and making sun as the point light source
// const pointLight = new THREE.PointLight(0xffffff, 20, 1000);
// pointLight.position.set(30, 0, 20);
// scene.add(pointLight);

// PerspectiveCamera -------------------------------------------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 1);


//Controls -------------------------------------------------
const canvas = document.querySelector("#canvas");
const controls = new THREE.OrbitControls(camera, canvas);
// controls.enableDamping = false;
controls.minDistance = 0.5;
controls.maxDistance = 3;
// controls.enablePan = false;
// controls.dampingFactor = false;

// controls.target = earth.position; // set the target
controls.update();

//Renderer -------------------------------------------------
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);




// responsive -------------------------------------------------
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// adding Ambient Light to the scene
const light = new THREE.AmbientLight(0xffffff, 0.8, 1000) ;
scene.add(light);
console.log(light);

const loader = new THREE.GLTF2Loader();

let model;
loader.load("spine.glb", function (gltf) {
  model = gltf.scene;
  scene.add(model);
  model.position.set(0, -0.5, 0);
  model.scale.set(15, 15, 15);

});

const clock = new THREE.Clock();

const mixer = new THREE.AnimationMixer();

function animate() {
  requestAnimationFrame(animate);
  mixer.update(clock.getDelta());

  // camera.updateProjectionMatrix();

  renderer.render(scene, camera);
}
animate();
