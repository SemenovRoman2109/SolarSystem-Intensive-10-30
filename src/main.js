import * as THREE from "three"
import { solarSystem, geometry } from "./baseObjects"
import { planets } from "./planets"
import { createStars } from "./stars"

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.append(renderer.domElement)

scene.add(solarSystem)

const fov = 75
const near = 0.1
const far = 1000
const aspect = window.innerWidth / window.innerHeight

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 50

const materialSun = new THREE.MeshBasicMaterial({color: "rgba(255, 251, 0, 1)"})
const sun = new THREE.Mesh(geometry, materialSun)
solarSystem.add(sun)
scene.add(sun)
sun.scale.set(5,5,5)

const stars = createStars(10000, 1000)

function animate(){
    planets.forEach((planet) => {
        planet.planet.rotation.y += 0.02
        planet.group.rotation.y += planet.speed /2
    })
    const points = stars.geometry.attributes.position.array
    for (let i = 2; i < points.length; i += 3){
        points[i] += 0.2
        if (points[i] > 500){
            points[i] = -500
        }
    }
    stars.geometry.attributes.position.needsUpdate = true
        

    // stars.rotation.y += 0.0002
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)