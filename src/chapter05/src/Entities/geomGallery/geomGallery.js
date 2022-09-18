
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

const color1 = [1, .1, .1]
const color2 = [1, 1, 1]

const createColumn = ({ h0 = 0, h1 = 30, h2 = 60, arc = false }) => {
    const h = h2 - h0
    //const h1 = h2 - Math.random() * (h / 2) * 0.7 

    
    let vArcRes = []
    let cArcRes = []
    let uvArcRes = []
    
    if (arc) {
        const { vArc, cArc, uvArc } = createDataSideArc({ h1, h2, color1, color2, ...arc })
        vArcRes = vArc
        cArcRes = cArc
        uvArcRes = uvArc
    }

    const {
        frontVert,
        frontColors,
        frontUV,
    //} = createDataSideColumn({ hTrunk: h, color1, color2 })
    } = createDataSideColumn({ h0, h1, color1, color2 })

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
        const { id, x, z, angle, h0, h1, h2, arc } = scheme[i] 


        let { vResult, cResult, uvResult } = createColumn({ h0, h1, h2, arc })
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
