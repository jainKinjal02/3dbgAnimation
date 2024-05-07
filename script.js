import * as THREE from 'three';
import './style.css';
import bg from './img/3dbgimage.jpeg'
import bg1 from './img/3bgimage2.jpeg'


const container = document.querySelector('.three_bg');
const button = document.querySelector('.btn')

let imageApplied = bg;
let toggle = true;

const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(14, 8, 15,9);
const material = new THREE.MeshBasicMaterial(
{ map: loader.load(imageApplied),
    }
);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z=5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

button.addEventListener('click', buttonClicked)
function buttonClicked(){
    console.log('button clicked')
    toggle = !toggle;
    if(toggle){
        imageApplied = bg
    }else{
        imageApplied = bg1
    }
    material.map = loader.load(imageApplied);
    material.needsUpdate = true;
}

function animate(){
    const time = clock.getElapsedTime();
    for(let i=0; i< count;i++){
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        const anim1 = 0.25 * Math.sin(x + time * 0.7);
        const anim2 = 0.35 * Math.sin(x * 1 + time * 0.7);
        const anim3 = 0.35 * Math.sin(y * 15 + time * 0.7);


        geometry.attributes.position.setZ(i, anim1 + anim2);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;

    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();