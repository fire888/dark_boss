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




export const createWay = ({
  color1,
  color2,
  h2,
}) => {


    const vertP = []
    const colorsP = []
    const uvTopP = []


    //const hP = 10
    const stepH = 20
    const r = 10
    const offset = 30
    const lBridge = 30 + 30 - r
    const count = 8



    const scheme = []
    for (let i = 0; i < count; ++i) {
        let x = -offset
        if (i % .5) {
            x = offset
        }
        let z = -offset
        if ((i + 1) % .5) {
            z = offset
        }

        scheme.push(
            { 
                h: stepH * i,
                r,
                x,
                z,  
            }
        )
    }



    //const scheme = [
    //    { h: 0, r: 10, x: -30, z: -30 },
    //    { h: 30, r: 10, x: 30, z: -30 },
    //    { h: 60, r: 10, x: 30, z: 30 },
    //    { h: 90, r: 10, x: -30, z: 30 },
    //    { h: 120, r: 10, x: -30, z: -30 },
    //]

    for (let i = 0; i < scheme.length; ++i) {
        const { h, r, x, z } = scheme[i]
        const hh = h - 3


        const v = []
        const c = []
        const u = []

        v.push(
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

            ...createFace(
                [-r, h, -r],
                [r, h, -r],
                [r, h - 30, -r - lBridge],
                [-r, h - 30, -r - lBridge],
            ),
        )
    
        rotateArr(v, Math.PI - ((Math.PI / 2) * (i)))
        translateArr(v, x, 0, z)

        vertP.push(...v)
       
        colorsP.push(
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
        )
    
        uvTopP.push(
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
        )
    }


    //console.log(vertTopElem)

    return {
        vertP,
        colorsP,
        uvTopP,
    }
}