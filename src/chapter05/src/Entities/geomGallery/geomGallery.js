
import { createDataSideColumn } from './dataSideColumn'
import { createDataSideArc } from "./dataSideArc";
import { createTopElem } from "./dataTopElem";
import { createSimpleColumn } from './dataSimpleColumn'
import {
    transformArr,
    translateArr,
    rotateArr,
    createFace,
    createUv,
    fillColorFace,
} from './helpers'
import { createScheme } from './shemeGallery'
import { lCol, lW } from '../../constants/constants_elements' 


const {
    PI,
    sin,
    cos,
} = Math

const color1 = [0, 0, 0]
const color2 = [0, .7, 0]

const createColumn = ({
    h0 = 0,
    h1 = 30,
    h2 = 60,
    arc = false,
    isTopElem = false,
    isColumn = false
}) => {
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



    const rCapital = 6
    const rBase = 5





    const {
        frontVert,
        frontColors,
        frontUV,
    } = createDataSideColumn({ h0, h1, color1, color2, rCapital, rBase })

    const leftVert = [...frontVert]
    transformArr(leftVert, 0, 0, 0, Math.PI / 2)

    const rightVert = [...frontVert]
    transformArr(rightVert, 0, 0, 0, -Math.PI / 2)

    const backVert = [...frontVert]
    transformArr(backVert, 0, 0, 0, Math.PI)




    const vCapColumn = createFace(
        [-rCapital, h1, rCapital],
        [rCapital, h1, rCapital],
        [rCapital, h1, -rCapital],
        [-rCapital, h1, -rCapital],
    )
    const cCapColumn = fillColorFace(color1)
    const uvCapColumn = createUv(
        [.5, 0],
        [1, 0],
        [1, .5],
        [.5, .5],
    ) 

    const vBotLColumn = createFace(
        [-rBase - lW, h0 - lW, rBase + lW],
        [rBase + lW, h0 - lW, rBase + lW],
        [rBase, h0 - lW, -rBase - lW],
        [-rBase, h0 - lW, -rBase - lW],
    )
    const cBotColumn = fillColorFace(lCol)
    const uvBotColumn = createUv(
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
    ) 




    const {
        vertTopElem,
        colorsTopElem,
        uvTopElem,
    } = createTopElem({ h2, color1, color2, isTopElem })

    const {
        vertColumn,
        colorsColumn,
        uvColumn,
    } = createSimpleColumn({ isColumn, h1, h2, color1, color2 })




    const vResult = [
        ...frontVert,
        ...leftVert,
        ...rightVert,
        ...backVert,
        ...vBotLColumn,
        ...vCapColumn,

        ...vArcRes,
        ...vertTopElem,
        ...vertColumn,

    ]
    const cResult = [
        ...frontColors,
        ...frontColors,
        ...frontColors,
        ...frontColors,
        ...cBotColumn,
        ...cCapColumn,


        ...cArcRes,
        ...colorsTopElem,
        ...colorsColumn,
    ]
    const uvResult = [
        ...frontUV,
        ...frontUV,
        ...frontUV,
        ...frontUV,
        ...uvBotColumn,
        ...uvCapColumn,


        ...uvArcRes,
        ...uvTopElem,
        ...uvColumn,
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
        const { id, x, z, angle, h0, h1, h2, arc, isTopElem, isColumn } = scheme[i]

        let { vResult, cResult, uvResult } = createColumn({ h0, h1, h2, arc, isTopElem, isColumn })


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
