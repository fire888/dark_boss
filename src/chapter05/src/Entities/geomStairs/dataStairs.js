import { createTopElem } from '../geomGallery/dataTopElem'

export const create = ({}) => {
    const arrV = []
    const arrC = []
    const arrUV = []

    console.log('!!!!')


    const {
        vertTopElem,
        colorsTopElem,
        uvTopElem,
    } = createTopElem( { 
        h2: 0,
        color1: [1, 1, 1],
        color2: [0, 0, 0],
        isTopElem: true, 
    })




    /** main ************/
    const vertices = new Float32Array(vertTopElem)
    const colors =  new Float32Array(colorsTopElem)
    const uv = new Float32Array(uvTopElem)

    return {
        vertices,
        colors,
        uv,
    }
}
