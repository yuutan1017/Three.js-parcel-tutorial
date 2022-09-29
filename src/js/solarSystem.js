import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import starsTexture from "../img/stars.jpg";
import sunTexture from "../img/sun.jpg";
import mercuryTexture from "../img/mercury.jpg";
import venusTexture from "../img/venus.jpg";
import earthTexture from "../img/earth.jpg";
import marsTexture from "../img/mars.jpg";
import jupiterTexture from "../img/jupiter.jpg";
import saturnTexture from "../img/saturn.jpg";
import saturnRingTexture from "../img/saturn ring.png";
import uranusTexture from "../img/uranus.jpg";
import uranusRingTexture from "../img/uranus ring.png";
import neptuneTexture from "../img/neptune.jpg";
import plutoTexture from "../img/pluto.jpg";
import { Object3D } from "three";

function solarSystem() {
  const scene = new THREE.Scene();
  //縦横をフルサイズで
  const width = window.innerWidth;
  const height = window.innerHeight;
  //描画する画面を設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  //カメラの設置
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  const orbit = new OrbitControls(camera, renderer.domElement);
  //カメラ位置の設置
  camera.position.set(-90, 130, 130);
  orbit.update();
  //ライトの設置
  const ambientLight = new THREE.AmbientLight(0x333333);
  const pointLight = new THREE.PointLight(0xffffff, 2, 300);
  scene.add(pointLight);
  scene.add(ambientLight);

  //背景の設置
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
  ]);

  //惑星の雛形
  function createPlanete(size, texture, position, ring) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, 30, 30),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture),
      })
    );
    mesh.position.x = position;
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32),
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(ring.texture),
          side: THREE.DoubleSide,
        })
      );
      obj.add(ringMesh);
      ringMesh.position.x = 138;
      ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    return { mesh, obj };
  }
  //惑星のジオメトリ
  //太陽
  const textureLoader = new THREE.TextureLoader();
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(16, 30, 30),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexture),
    })
  );
  scene.add(sun);

  const mercury = createPlanete(3.2, mercuryTexture, 28);
  const venus = createPlanete(5.8, venusTexture, 44);
  const earth = createPlanete(6, earthTexture, 62);
  const mars = createPlanete(4, marsTexture, 78);
  const jupiter = createPlanete(12, jupiterTexture, 100);
  const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture,
  });
  const uranus = createPlanete(7, uranusTexture, 176);
  const neptune = createPlanete(7, neptuneTexture, 200);
  const pluto = createPlanete(2.8, plutoTexture, 216);

  function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", () => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}
solarSystem();
