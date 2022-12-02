import * as THREE from 'three'
import {Vector3} from "three";


const v1 = new THREE.Vector3(5, 0, 1)
const v2 = new THREE.Vector3(3, 0, 3)

console.log('erererere', v1.dot(v2))

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

    /** connectors */
    for (let i = 1; i < arr.length; ++i) {
        const prev = arr[i - 1]
        const next = arr[i]

        const toZeroNext = new THREE.Vector3().copy(next.axisData.p1).sub(next.axisData.p0)
        const toZeroPrev = new THREE.Vector3().copy(prev.axisData.p0).sub(prev.axisData.p1)

        const result = new THREE.Vector3()
            .copy(toZeroNext)
            .sub(toZeroPrev)
            .add(prev.axisData.p1)
            //.setLength(100)

        arr[i].res = result
        //const senterL =

    }

    console.log(arr)

    return arr
}