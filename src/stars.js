import * as THREE from "three"
import { solarSystem } from "./baseObjects.js"

export function createStars(countOfStars, rangeOfStars) {
    const positions = []
    for (let i = 0; i < countOfStars; i++) {
        positions.push(
            Math.random() * rangeOfStars - rangeOfStars/2,
            Math.random() * rangeOfStars - rangeOfStars/2,
            Math.random() * rangeOfStars - rangeOfStars/2
        )
    }
    const geometryStars = new THREE.BufferGeometry()
    geometryStars.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    )
    const materialStars = new THREE.PointsMaterial({
        color: "rgba(191, 191, 191, 1)",
        size: 0.5
    })
    const stars = new THREE.Points(geometryStars, materialStars)
    solarSystem.add(stars)
    return stars
}
