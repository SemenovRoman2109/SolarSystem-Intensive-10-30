import * as THREE from "three"

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.append(renderer.domElement)

const fov = 90
const near = 0.1
const far = 1000
const aspect = window.innerWidth / window.innerHeight

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5

// const geometry = new THREE.BoxGeometry(1, 2, 1)
// const material = new THREE.MeshBasicMaterial({color: "rgba(7, 102, 191, 1)"})
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

const geometrySun = new THREE.SphereGeometry(2, 64, 64)
const materialSun = new THREE.MeshBasicMaterial({color: "rgba(255, 251, 0, 1)"})
const sun = new THREE.Mesh(geometrySun, materialSun)
scene.add(sun)

function animate(){
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)