import {
    createFace,
    createUv,
    createFaceWithSquare,
    fillColorFace,
    fillColorFaceWithSquare,
    translateArr,
    rotateArr,
} from '../geomGallery/helpers'
import { lCol, lW } from '../../constants/constants_elements' 

const {
    floor,
    random,
    PI,
    sin,
    cos,
} = Math



const createScheme = () => {
    const r = 20
    const stepH = 20
    const count = 25
    const tickness = 7
    const hColumn = stepH * 4
    const rColumn = 3
    const offset = 50

    const lBridge = offset + offset - r - r



    const scheme = []
    for (let i = 0; i < count; ++i) {
        const h = stepH * i
        const hh = h - tickness

        let x = 0
        let z = 0

        const p = i % 4
        if (p < 1) {
            x = -offset
            z = -offset
        } else if (p < 2) {
            x = offset
            z = -offset
        } else if (p < 3) {
            x = offset
            z = offset
        } else if (p < 4) {
            x = -offset
            z = offset
        }

        scheme.push({
            offset,
            h,
            hh,
            r,
            x,
            z,
            bridgeMinusH: stepH,
            bridgeL: lBridge,
            hColumn,
            rColumn,
        })
    }

    return scheme
}


const createSegment = (data) => {

}



export const createWay = ({
  color1,
  color2,
  h2,
}) => {


    const vertP = []
    const colorsP = []
    const uvTopP = []





    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)


    const scheme = createScheme()



    for (let i = 0; i < scheme.length; ++i) {
        const { h, hh, r, x, z, bridgeL, bridgeMinusH, hColumn, rColumn } = scheme[i]

        const v = []
        const c = []
        const u = []

        v.push(
            /** place */    

            ...createFace(
                [-r, h, r],
                [r, h, r],
                [r, h, -r],
                [-r, h, -r],
            ),
    
            ...createFace(
                [-r, hh, r],
                [r, hh, r],
                [r, h, r],
                [-r, h, r],
            ),
    
            ...createFace(
                [-r, hh, -r],
                [-r, hh, r],
                [-r, h, r],
                [-r, h, -r],
            ),
    
            ...createFace(
                [r, hh, r],
                [r, hh, -r],
                [r, h, -r],
                [r, h, r],
            ),
    
            ...createFace(
                [r, hh, -r],
                [-r, hh, -r],
                [-r, h, -r],
                [r, h, -r],
            ),

            // bottom
            ...createFace(
                [r, hh, -r],
                [r, hh, r],
                [-r, hh, r],
                [-r, hh, -r],
            ),

            /** connect */

            ...createFace(
                [-r, h, -r],
                [r, h, -r],
                [r, h - bridgeMinusH, -r - bridgeL],
                [-r, h - bridgeMinusH, -r - bridgeL],
            ),

            ...createFace(
                [-r, hh - bridgeMinusH, -r - bridgeL],
                [-r, hh, -r],
                [-r, h, -r],
                [-r, h - bridgeMinusH, -r - bridgeL],
            ),


            ...createFace(
                [r, hh, -r],
                [r, hh - bridgeMinusH, -r - bridgeL],
                [r, h - bridgeMinusH, -r - bridgeL],
                [r, h, -r],
            ),

            ...createFace(
                [-r, hh - bridgeMinusH, -r - bridgeL],
                [r, hh - bridgeMinusH, -r - bridgeL],
                [r, hh, -r],
                [-r, hh, -r],
            ),


            /** column */
            ...createFace(
                [r - rColumn, h - hColumn, r - rColumn],
                [r - rColumn, h - hColumn, r + rColumn],
                [r - rColumn, h, r + rColumn],
                [r - rColumn, h, r - rColumn],
            ),
            ...createFace(
                [r - rColumn, h - hColumn, r + rColumn],
                [r + rColumn, h - hColumn, r + rColumn],
                [r + rColumn, h, r + rColumn],
                [r - rColumn, h, r + rColumn],
            ),
            ...createFace(
                [r + rColumn, h - hColumn, r + rColumn],
                [r + rColumn, h - hColumn, r - rColumn],
                [r + rColumn, h, r - rColumn],
                [r + rColumn, h, r + rColumn],
            ),
            ...createFace(
                [r + rColumn, h - hColumn, r - rColumn],
                [r - rColumn, h - hColumn, r - rColumn],
                [r - rColumn, h, r - rColumn],
                [r + rColumn, h, r - rColumn],
            ),


        )
    
        rotateArr(v, Math.PI - ((Math.PI / 2) * (i)))
        translateArr(v, x, 0, z)

        vertP.push(...v)
       
        colorsP.push(
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
        )
    
        uvTopP.push(
            ...uvBr,
            ...uvCl,
            ...uvCl,
            ...uvCl,
            ...uvCl,
            ...uvBr,
            ...uvBr,
            ...uvCl,
            ...uvCl,
            ...uvBr,
            ...uvCl,
            ...uvCl,
            ...uvCl,
            ...uvCl,  
        )
    }


    //console.log(vertTopElem)

    return {
        vertP,
        colorsP,
        uvTopP,
    }
}