
import { createDataSideColumn } from './dataSideColumn'
import { createDataSideArc } from "./dataSideArc";
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



const createColumn = ({ h = 30, arc = false }) => {
    let vArcRes = []
    let cArcRes = []
    let uvArcRes = []
    if (arc) {
        //console.log('!!!!', arc)
        const { vArc, cArc, uvArc } = createDataSideArc({ hStart: h + 7.5, ...arc })
        vArcRes = vArc
        cArcRes = cArc
        uvArcRes = uvArc
    }

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

        ...vArcRes,
    ]
    const cResult = [
        ...frontColors,
        ...frontColors,
        ...frontColors,
        ...frontColors,

        ...cArcRes,
    ]
    const uvResult = [
        ...frontUV,
        ...frontUV,
        ...frontUV,
        ...frontUV,

        ...uvArcRes,
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
        const { x, z, angle, arc } = scheme[i]

        let { vResult, cResult, uvResult } = createColumn({ h, arc })
        //let vResult = [], cResult = [], uvResult = []



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
