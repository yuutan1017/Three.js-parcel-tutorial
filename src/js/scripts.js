import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//縦横をフルサイズで
const width = window.innerWidth;
const height = window.innerHeight;

//描画する画面を設定
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 2, 5);
orbit.update();

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

//箱形のジオメトリ
const box = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(box);

//球体のジオメトリ
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(4, 100, 100),
  new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true}),
);
sphere.position.x = -10;
scene.add(sphere);

//白の地面
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  }),
);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//マス目
const grid = new THREE.GridHelper(30, 50);
scene.add(grid);

function animation(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);
