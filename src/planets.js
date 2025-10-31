import * as THREE from "three"
import $ from "jquery"
import { solarSystem, geometry, loaderTexture } from "./baseObjects"

function createOrbit(distance){
    const orbitGeometry = new THREE.RingGeometry(distance-0.05, distance+0.05, 128)
    const material = new THREE.MeshBasicMaterial({
        color:"gray",
        side:THREE.DoubleSide,
        transparent:1,
        opacity:0.6 
    })
    const orbit = new THREE.Mesh(orbitGeometry, material)
    orbit.rotateX(Math.PI / 2)

    return orbit
}

export function createRingPlanet(color, distance, size){
  const ringForm = new THREE.RingGeometry(distance, distance + size, 128)
  const material = new THREE.MeshBasicMaterial({
        color, 
        side: THREE.DoubleSide, 
        opacity: 0.4, 
        transparent: true 
    })
  const ring = new THREE.Mesh(ringForm, material)
  ring.rotateX(Math.PI / 2.5)
  return ring
}

export function createPlanet(name, size, distance, speed){
    const planetGroup = new THREE.Object3D()
    solarSystem.add(planetGroup)
     
    const texture = loaderTexture.load(`src/textures/${name}.jpg`)
    const materialPlanet = new THREE.MeshStandardMaterial({ map: texture })
    const planet = new THREE.Mesh(geometry, materialPlanet)

    planet.scale.set(size, size, size)
    planet.position.x = distance

    planetGroup.add(planet)
    solarSystem.add(createOrbit(distance))
    if (name == "Saturn"){
        planet.add(createRingPlanet("#35322e", 1.3, 0.2 ))
        planet.add(createRingPlanet("#cdc7ab", 1.55, 0.5 ))
        planet.add(createRingPlanet("#908c8a", 2.08, 0.35 ))
    }
    return {name: name, group: planetGroup, planet:planet, speed:speed}
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

export function showPlanetInfo(name){
    const info = planetsInfo[name]
    $("#name").text(name)
    $("#description").text(info.description)
    $("#type").text(info.type)
    $("#diameter").text(info.diameter)
    $("#mass").text(info.mass)
    $("#distance").text(info.distance)
    $("#orbitalPeriod").text(info.orbitalPeriod)
    $("#temperature").text(info.temperature)

    $("#infoPlanet").fadeIn(300)
}

const planetsInfo = {
  Mercury: {
    description:
      "The closest planet to the Sun and the smallest in the Solar System.",
    type: "Rocky",
    diameter: "4,879 km",
    mass: "3.30 × 10^23 kg",
    distance: "57.9 million km (0.387 AU)",
    orbitalPeriod: "88 days",
    temperature: "−173 … +427 °C",
  },
  Venus: {
    description:
      "The second planet from the Sun and the hottest in the Solar System.",
    type: "Rocky",
    diameter: "12,104 km",
    mass: "4.87 × 10^24 kg",
    distance: "108 million km (0.723 AU)",
    orbitalPeriod: "225 days",
    temperature: "≈470 °C",
  },
  Earth: {
    description: "Our home planet, the only known one to support life.",
    type: "Rocky",
    diameter: "12,742 km",
    mass: "5.97 × 10^24 kg",
    distance: "149.6 million km (1 AU)",
    orbitalPeriod: "365 days",
    temperature: "−89 … +58 °C",
  },
  Mars: {
    description:
      "The Red Planet, home to the tallest volcano in the Solar System.",
    type: "Rocky",
    diameter: "6,779 km",
    mass: "6.42 × 10^23 kg",
    distance: "227.9 million km (1.52 AU)",
    orbitalPeriod: "687 days",
    temperature: "−125 … +20 °C",
  },
  Jupiter: {
    description: "The largest planet in the Solar System.",
    type: "Gas giant",
    diameter: "142,984 km",
    mass: "1.90 × 10^27 kg",
    distance: "778.6 million km (5.2 AU)",
    orbitalPeriod: "11.86 years",
    temperature: "≈−145 °C (cloud-top average)",
  },
  Saturn: {
    description: "Famous for its massive rings made of ice and rock.",
    type: "Gas giant",
    diameter: "120,536 km",
    mass: "5.68 × 10^26 kg",
    distance: "1.43 billion km (9.58 AU)",
    orbitalPeriod: "29.5 years",
    temperature: "≈−178 °C",
  },
  Uranus: {
    description: "An ice giant that rotates lying on its side.",
    type: "Ice giant",
    diameter: "50,724 km",
    mass: "8.68 × 10^25 kg",
    distance: "2.87 billion km (19.2 AU)",
    orbitalPeriod: "84 years",
    temperature: "≈−224 °C",
  },
  Neptune: {
    description:
      "The most distant planet, known for its extremely strong winds.",
    type: "Ice giant",
    diameter: "49,244 km",
    mass: "1.02 × 10^26 kg",
    distance: "4.50 billion km (30.1 AU)",
    orbitalPeriod: "165 years",
    temperature: "≈−214 °C",
  },
  Sun: {
    description:
      "",
    type: "Star",
    diameter: "",
    mass: "",
    distance: "0km",
    orbitalPeriod: "0 years",
    temperature: "",
  },
};
