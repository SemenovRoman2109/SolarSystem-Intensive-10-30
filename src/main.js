import * as THREE from "three"
import $, { event } from "jquery"
import { solarSystem, geometry } from "./baseObjects"
import { planets, showPlanetInfo } from "./planets"
import { createStars } from "./stars"
import { sun, sunAnimation, sunGlow } from "./sun"

$(() => {
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
    camera.position.y = 10

    scene.add(sun)

    const sunLight = new THREE.PointLight(0xffffff, 1000, 0, 2)
    const ambientLight = new THREE.AmbientLight(0x222222)
    scene.add(sunLight)
    scene.add(ambientLight)

    const stars = createStars(10000, 1000)
    let targetZ = camera.position.z
    let chosenPlanet = null
    let cameraDistance = 25
    let cameraRotation = 0
    const cameraSpeed = 0.01
    
    $(window).on("wheel", (event) => {
        const deltaY = event.originalEvent.deltaY
        targetZ += deltaY / 10
        targetZ = Math.min(200, targetZ)
        targetZ = Math.max(10, targetZ)
        if (chosenPlanet){
            targetZ = Math.min(75, targetZ)
        }
    })

    const buttons = $("<div>").addClass("buttons")
    $("body").append(buttons)
    planets.forEach(planet=>{
        const button = $("<button>").text(planet.name).addClass("button").on("click", () => {
            chosenPlanet = planet.planet
            targetZ = 40
            showPlanetInfo(planet.name)
        })
        buttons.append(button)
    })
    const sunButton = $("<button>").text("Sun").addClass("button").on("click", ()=>{
        chosenPlanet = null
        // showPlanetInfo("Sun")
        $("#infoPlanet").fadeOut(300)
    })
    buttons.append(sunButton)
    
    function animate(){
        if (chosenPlanet == null){
            camera.position.z += (targetZ - camera.position.z) * 0.05
            camera.position.x = 0
            camera.position.y = 30
            camera.lookAt(0, 0, 0)
        }else{
            cameraDistance += (targetZ - cameraDistance) * 0.05
            cameraRotation += cameraSpeed
            const planetPosition = new THREE.Vector3()
            chosenPlanet.getWorldPosition(planetPosition)
            camera.position.x = planetPosition.x + Math.cos(cameraRotation) * cameraDistance
            camera.position.z = planetPosition.z + Math.sin(cameraRotation) * cameraDistance
            camera.position.y = planetPosition.y + 15
            camera.lookAt(planetPosition)
        }
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
        sunAnimation()
        renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

})