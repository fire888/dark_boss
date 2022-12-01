import * as THREE from 'three'
import {Vector3} from "three";

export const createSchemePath = () => {
    const arr = []
    const count = 15

    const currentDirectionVec3 = new THREE.Vector3(0, 0, -1)
    const axis = new THREE.Vector3(0, 1, 0)
    const stepVec3 = new THREE.Vector3()
    const prevPoint = new THREE.Vector3()
    const currentResult = new THREE.Vector3()


    /** axis ****/
    for (let i = 0; i < count; ++i) {
        const dist = Math.random() * 200 + 50
        const angle = (Math.random() * 0.5 - 0.25) * Math.PI

        currentDirectionVec3.applyAxisAngle(axis, angle)
        stepVec3.copy(currentDirectionVec3)
        stepVec3.setLength(dist)

        currentResult.add(stepVec3)

        arr.push({
            axisData: {
                p0: new THREE.Vector3().copy(prevPoint),
                p1: new THREE.Vector3().copy(currentResult),
                vecNormalized: new THREE.Vector3().copy(currentDirectionVec3),
                vecFull: new THREE.Vector3().copy(stepVec3)
            },
        })
        prevPoint.copy(currentResult)
    }

    /** left / right **/
    for (let i = 0; i < arr.length; ++i) {
        const { axisData } = arr[i]
        const w = Math.random() * 100 + 10

        const rotLeftV3 = new THREE.Vector3()
                        .copy(axisData.vecNormalized)
                        .applyAxisAngle(axis, Math.PI / 2)
                        .setLength(w)

        const p0Left = new THREE.Vector3().copy(axisData.p0).add(rotLeftV3)
        const p1Left = new THREE.Vector3().copy(axisData.p1).add(rotLeftV3)
        arr[i].leftData = { p0: p0Left, p1: p1Left }

        const rotRightV3 = new THREE.Vector3()
            .copy(axisData.vecNormalized)
            .applyAxisAngle(axis, -Math.PI / 2)
            .setLength(w)

        const p0Right = new THREE.Vector3().copy(axisData.p0).add(rotRightV3)
        const p1Right = new THREE.Vector3().copy(axisData.p1).add(rotRightV3)
        arr[i].rightData = { p0: p0Right, p1: p1Right }
    }

    console.log(arr)

    return arr
}