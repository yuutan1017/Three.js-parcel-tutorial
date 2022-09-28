import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
//縦横をフルサイズで
const width = window.innerWidth;
const height = window.innerHeight;

//描画する画面を設定
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10, 30, 30);
orbit.update();

//箱形のジオメトリ
const box = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(box);

//球体のジオメトリ
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(4, 30, 30),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;
scene.add(sphere);

const options = {
  sphereColor: "#5512ba",
  wireframe: false,
  speed: 0.01,
  angle: 0.1,
  penumbra: 0,
  intensity: 1,
};

//パレットの追加
const gui = new dat.GUI();
gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange((e) => {
  sphere.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.1);
gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);


function developOptions() {
  //白の地面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    })
  );
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);
  //マス目
  const grid = new THREE.GridHelper(30, 50);
  scene.add(grid);
  //軸の表示
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);
}

//光関係
function variousLight() {
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  scene.add(directionalLight);
  directionalLight.position.set(-30, 50, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.bottom = -12;

  const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
  scene.add(dLightHelper);

  const dLightShadowHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  );
  scene.add(dLightShadowHelper);
}

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.1;
scene.add(spotLight);

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

let step = 0;
function animation(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  renderer.render(scene, camera);
}

variousLight();
developOptions();
renderer.setAnimationLoop(animation);
