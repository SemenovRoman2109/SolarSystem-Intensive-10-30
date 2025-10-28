import * as THREE from "three"
import { solarSystem, geometry } from "./baseObjects"

export function createPlanet(name, color, size, distance, speed){
    const planetGroup = new THREE.Object3D()
    solarSystem.add(planetGroup)

    const materialPlanet = new THREE.MeshBasicMaterial({color})
    const planet = new THREE.Mesh(geometry, materialPlanet)
    planet.scale.set(size, size, size)
    planet.position.x = distance

    planetGroup.add(planet)
    return {group: planetGroup, planet:planet, speed:speed}
} 

export const planets = [
    createPlanet("Mercury", "rgba(126, 129, 132, 1)", 0.4, 10, 0.04),
    createPlanet("Venus", "rgba(205, 129, 7, 1)", 0.9, 15, 0.03),
    createPlanet("Earth", "rgba(7, 93, 205, 1)", 1, 20, 0.02),
    createPlanet("Mars", "rgba(197, 143, 34, 1)",0.7, 25, 0.018),
    createPlanet("Jupiter", "rgba(159, 136, 90, 1)",2, 35, 0.01),
    createPlanet("Saturn", "rgba(174, 150, 102, 1)",1.7, 45, 0.008),
    createPlanet("Uranus", "rgba(63, 127, 215, 1)", 1.2, 55, 0.006),
    createPlanet("Neptune", "rgba(15, 33, 188, 1)", 1.1, 65, 0.005)
]