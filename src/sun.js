import * as THREE from "three"
import { solarSystem, geometry, loaderTexture } from "./baseObjects"

const materialSun = new THREE.MeshBasicMaterial({color: "rgba(255, 200, 0, 1)"})
export const sun = new THREE.Mesh(geometry, materialSun)
solarSystem.add(sun)
sun.scale.set(5,5,5)

const sunGlowTexture = loaderTexture.load("src/textures/sunGlow.png")
const glowMaterial= new THREE.SpriteMaterial({ 
    map: sunGlowTexture,
    blending: THREE.AdditiveBlending
})

export const sunGlow = new THREE.Sprite(glowMaterial)
sunGlow.scale.set(5, 5, 5)
sun.add(sunGlow)

function createSolarWind(count = 1000, radius = 10 ){
    const geometry = new THREE.BufferGeometry()
    const position = new Float32Array(count * 3)
    
    for (let i = 0; i < count * 3; i++){
        position[i] = (Math.random() * radius * 2) - radius
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
    const sunMaterial = new THREE.PointsMaterial({
        size: 0.2,
        map: sunGlowTexture,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false
        
    })
    const solarPoints = new THREE.Points(geometry, sunMaterial)
    solarSystem.add(solarPoints)
    return solarPoints
}

const solarWind = createSolarWind() 

let time = 0;
export function sunAnimation(){
    time += 0.016
    const pulsation = Math.sin(time) * 0.05 + 1
    sun.scale.set(5 * pulsation, 5 * pulsation, 5 * pulsation)
    sunGlow.scale.set(4 * pulsation, 4 * pulsation, 4 * pulsation)
    sunGlow.material.opacity = pulsation

    const position = solarWind.geometry.attributes.position.array
    for (let i = 0; i < position.length / 3; i+=3){
        position[i] += position[i] * 0.01
        position[i + 1] += position[i + 1] * 0.01
        position[i + 2] += position[i + 2] * 0.01
        if (Math.abs(position[i]) > 50 || Math.abs(position[i + 1]) > 50 || Math.abs(position[i + 2]) > 50){
            position[i] = (Math.random() * 20) - 10
            position[i + 1] = (Math.random() * 20) - 10
            position[i + 2] = (Math.random() * 20) - 10
        }
    }
    solarWind.geometry.attributes.position.needsUpdate = true
}