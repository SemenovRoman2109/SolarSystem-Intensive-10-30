import * as THREE from "three"
import { solarSystem, geometry, loaderTexture } from "./baseObjects"

export function createPlanet(name, size, distance, speed){
    const planetGroup = new THREE.Object3D()
    solarSystem.add(planetGroup)
     
    const texture = loaderTexture.load(`src/textures/${name}.jpg`)
    const materialPlanet = new THREE.MeshBasicMaterial({ map: texture })
    const planet = new THREE.Mesh(geometry, materialPlanet)
    planet.scale.set(size, size, size)
    planet.position.x = distance

    planetGroup.add(planet)
    return {group: planetGroup, planet:planet, speed:speed}
} 

export const planets = [
    createPlanet("Mercury", 0.4, 10, 0.04),
    createPlanet("Venus", 0.9, 15, 0.03),
    createPlanet("Earth", 1, 20, 0.02),
    createPlanet("Mars",0.7, 25, 0.018),
    createPlanet("Jupiter",2, 35, 0.01),
    createPlanet("Saturn",1.7, 45, 0.008),
    createPlanet("Uranus", 1.2, 55, 0.006),
    createPlanet("Neptune", 1.1, 65, 0.005)
]