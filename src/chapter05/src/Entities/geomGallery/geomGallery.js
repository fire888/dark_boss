
import { createDataSideColumn } from './dataSideColumn'
import {
    transformArr,
    translateArr,
    rotateArr,
} from './helpers'
import { createScheme } from './shemeGallery'



const {
    PI,
    sin,
    cos,
} = Math



const createColumn = ({ h = 30 }) => {
    const {
        frontVert,
        frontColors,
        frontUV,
    } = createDataSideColumn({ hTrunk: h })

    const leftVert = [...frontVert]
    transformArr(leftVert, 0, 0, 0, Math.PI / 2)

    const rightVert = [...frontVert]
    transformArr(rightVert, 0, 0, 0, -Math.PI / 2)

    const backVert = [...frontVert]
    transformArr(backVert, 0, 0, 0, Math.PI)

    const vResult = [
        ...frontVert,
        ...leftVert,
        ...rightVert,
        ...backVert,
    ]
    const cResult = [
        ...frontColors,
        ...frontColors,
        ...frontColors,
        ...frontColors,
    ]
    const uvResult = [
        ...frontUV,
        ...frontUV,
        ...frontUV,
        ...frontUV,
    ]

    return {
        vResult,
        cResult,
        uvResult,
    }
}



export const createGeomGallery = ({}) => {
    const arrV = []
    const arrC = []
    const arrUV = []

    const scheme = createScheme()

    const h = Math.random() * 50 + 10
    for (let i = 0; i < scheme.length; ++i) {
        const { x, z, angle } = scheme[i]

        const { vResult, cResult, uvResult } = createColumn({ h })
        rotateArr(vResult, angle)
        translateArr(vResult, x, 0, z, angle)
        arrV.push(...vResult)
        arrC.push(...cResult)
        arrUV.push(...uvResult)
    }

    /** main ************/
    const vertices = new Float32Array(arrV)
    const colors =  new Float32Array(arrC)
    const uv = new Float32Array(arrUV)

    return {
        vertices,
        colors,
        uv,
    }
}
