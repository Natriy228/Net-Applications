// detail.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {ParkingComponent} from '../../components/parking/index.js';
import {HeaderComponent} from '../../components/header/index.js';

// ---- ПРЕСЕТЫ ----
const PRESETS = [
  {
    id: 1,
    title: "Главное здание",
    model: "../../resources/3Dmodels/MBparking.glb",
    text: "Парковка у главного входа в ГУК МГТУ",
    im_desc: "Изображение ГЗ со стороны праковки",
    page_src: "../../resources/images/MBimage cropped.JPG"
  },
  {
    id: 2,
    title: "Учебно-лабораторный корпус",
    model: "../../resources/3Dmodels/MBparking.glb",
    text: "Парковка у УЛК МГТУ",
    im_desc: "Изображение УЛК со стороны праковки",
    page_src: "../../resources/images/LLCimage cropped.JPG"
  },
  {
    id: 3,
    title: "Спортивный комплекс",
    model: "../../resources/3Dmodels/MBparking.glb",
    text: "Парковка на территории СК МГТУ\n",
    im_desc: "Изображение СК",
    page_src: "../../resources/images/SCimage cropped.JPG"
  },
  {
    id: 4,
    title: "Конгресс-центр",
    models: [
      { title: "Парковка", model: "../../resources/3Dmodels/MBparking.glb" },
      { title: "Машина", model: "../../resources/3Dmodels/Range Rover.glb" },
    ],
    text: "Парковка во дворе конгресс-центра МГТУ",
    im_desc: "Изображение конгресс-центра",
    page_src: "../../resources/images/CCimage cropped.JPG"
  }
];

// ---- ГЛОБАЛЬНЫЕ camera и controls ----
let camera, controls;

const header = new HeaderComponent(document.getElementById("pageRoot"));
header.render();

// ---- ВЫБОР МОДЕЛИ ----
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let modelData = null;
let title = '';
let toRender = [];

modelData = PRESETS.find(m => m.id === Number(id));
title = modelData?.title || '';
if (modelData?.models) {
  toRender = modelData.models.map(x => ({ model: x.model }));
} else if (modelData?.model) {
  toRender = [{ model: modelData.model }];
}
renderModel();

// ---- ФУНКЦИЯ ОТРИСОВКИ ----
function renderModel() {
  const canvas = document.getElementById('viewer-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe6ebf5);

  // camera и controls — глобальные!
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.target.set(0, 1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.7);
  dirLight.position.set(4, 10, 8);
  scene.add(dirLight);

  const loader = new GLTFLoader();
  let loaded = [];
  const gap = 1.8;

  if (toRender.length === 2) {
    toRender.forEach((item, i) => {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        if (i === 1) { 
          model.position.y = 1.4;
          model.position.z = -3.5;
          model.position.x = -1.4;
        }
        scene.add(model);
        loaded.push(model);
      });
    });
  } else if (toRender.length === 1) {
    const item = toRender[0];
    if (item.model) {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        scene.add(model);
        loaded.push(model);
      });
    } else if (item.buffer) {
      loader.parse(item.buffer, '', gltf => {
        const model = gltf.scene;
        scene.add(model);
        loaded.push(model);
      }, error => {
        alert('Не удалось загрузить модель');
        console.error(error);
      });
    }
  }

  // --- Resize и animate ---
  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', resizeRendererToDisplaySize);
}
