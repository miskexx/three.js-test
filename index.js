import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"


const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: '#ffffffff',
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh)

const vireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, vireMat);
wireMesh.scale.setScalar(1.001)
mesh.add(wireMesh)

const hemilight = new THREE.HemisphereLight("rgba(228, 134, 189, 1)", "rgba(75, 2, 170, 1)");
scene.add(hemilight)
function animate(t = 0) {
    requestAnimationFrame(animate);
    //mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();