import * as THREE from "three"

export const solarSystem = new THREE.Object3D()
export const geometry = new THREE.SphereGeometry(1, 64, 64)

export const loaderTexture = new THREE.TextureLoader()