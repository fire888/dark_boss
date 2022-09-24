import { createWay } from './dataWay'

export const create = ({}) => {
    const arrV = []
    const arrC = []
    const arrUV = []


    const {
        vertP,
        colorsP,
        uvTopP,
    } = createWay( { 
        h2: 0,
        color1: [1, 1, 1],
        color2: [0, 0, 0],
    })




    /** main ************/
    const vertices = new Float32Array(vertP)
    const colors =  new Float32Array(colorsP)
    const uv = new Float32Array(uvTopP)

    return {
        vertices,
        colors,
        uv,
    }
}
