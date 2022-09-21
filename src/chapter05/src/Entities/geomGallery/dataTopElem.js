import {
    createFace,
    createUv,
    createFaceWithSquare,
    fillColorFace,
    fillColorFaceWithSquare
} from './helpers'
import { lCol, lW } from '../../constants/constants_elements' 

const {
    floor,
    random,
    PI,
    sin,
    cos,
} = Math




export const createTopElem = ({
  isTopElem,
  color1,
  color2,
  h2,
}) => {


    if (!isTopElem) {
        return {
            vertTopElem: [],
            colorsTopElem: [],
            uvTopElem: [],
        }
    }


    const vertTopElem = []
    const colorsTopElem = []
    const uvTopElem = []


    const hl1 = 2 + Math.random() * 12
    const hl2 = 1 + Math.random() * 4
    const hl3 = .2 + Math.random() * 40
    const hl4 = .1 + Math.random() * 10
    const hl5 = .1 + Math.random() * 10
    const hl6 = .1 + Math.random() * 40


    const count = 6//Math.floor(Math.random() * 5) + 4
    for (let i = 0; i < count; ++i) {

        let nextI = i + 1
        if (nextI > count) {
            nextI = 0
        }


        const angle1 = i / count * Math.PI * 2
        const angle2 = nextI / count * Math.PI * 2

        let _h1 = h2
        let _h2 = _h1 + hl1
        let _r1 = 6
        let _r2 = 6
        const sA1 = sin(angle1)
        const cA1 = cos(angle1)
        const sA2 = sin(angle2)
        const cA2 = cos(angle2)


        vertTopElem.push(...createFace(
            [sA1 * _r1, _h1, cA1 * _r1],
            [sA2 * _r1, _h1, cA2 * _r1],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA1 * _r2, _h2, cA1 * _r2],
        ))

        _h1 = _h2
        _h2 = _h1 + hl2
        _r1 = _r2
        _r2 = 3

        vertTopElem.push(...createFace(
            [sA1 * _r1, _h1, cA1 * _r1],
            [sA2 * _r1, _h1, cA2 * _r1],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA1 * _r2, _h2, cA1 * _r2],
        ))


        _h1 = _h2
        _h2 = _h1 + hl3
        _r1 = _r2
        _r2 = _r1

        vertTopElem.push(...createFace(
            [sA1 * _r1, _h1, cA1 * _r1],
            [sA2 * _r1, _h1, cA2 * _r1],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA1 * _r2, _h2, cA1 * _r2],
        ))

        _h1 = _h2
        _h2 = _h1 + hl4
        _r1 = _r2
        _r2 = _r1 + 4

        vertTopElem.push(...createFace(
            [sA1 * _r1, _h1, cA1 * _r1],
            [sA2 * _r1, _h1, cA2 * _r1],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA1 * _r2, _h2, cA1 * _r2],
        ))



        _h1 = _h2
        _h2 = _h1 + hl5
        _r1 = _r2
        _r2 = _r1

        /** baraban */
        vertTopElem.push(...createFace(
            [sA1 * _r1, _h1, cA1 * _r1],
            [sA2 * _r1, _h1, cA2 * _r1],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA1 * _r2, _h2, cA1 * _r2],
        ))
        /** baraban stroke */
        let lW3 = lW + .5
        vertTopElem.push(...createFace(
            [sA2 * (_r1 + lW3), _h1, cA2 * (_r1 + lW3)],
            [sA1 * (_r1 + lW3), _h1, cA1 * (_r1 + lW3)],
            [sA1 * (_r2 + lW3), _h2, cA1 * (_r2 + lW3)],
            [sA2 * (_r2 + lW3), _h2, cA2 * (_r2 + lW3)],
        ))






        vertTopElem.push(...createFace(
            [sA1 * _r2, _h2, cA1 * _r2],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA2 * 2, _h2, cA2 * 2],
            [sin(angle1) * 2, _h2, cA1 * 2],
        ))

        _h1 = _h2
        _h2 = _h1 + hl6
        _r1 = 2
        _r2 = 7

        vertTopElem.push(...createFace(
            [sA1 * _r1, _h1, cA1 * _r1],
            [sA2 * _r1, _h1, cA2 * _r1],
            [sA2 * _r2, _h2, cA2 * _r2],
            [sA1 * _r2, _h2, cA1 * _r2],
        ))

        /** top con */

        const lW2 = lW
        vertTopElem.push(...createFace(
            [sA2 * (_r1 + lW2), _h1, cA2 * (_r1 + lW2)],
            [sA1 * (_r1 + lW2), _h1, cA1 * (_r1 + lW2)],
            [sA1 * (_r2 + lW2), _h2, cA1 * (_r2 + lW2)],
            [sA2 * (_r2 + lW2), _h2, cA2 * (_r2 + lW2)],
        ))



        _h1 = _h2
        _h2 = _h2 + hl6
        vertTopElem.push(
            sA1 * _r2, _h1, cA1 * _r2,
            sA2 * _r2, _h1, cA2 * _r2,
            0, _h2, 0,
        )
        vertTopElem.push(
            sA2 * (_r2 + .5), _h1, cA2 * (_r2 + .5),
            sA1 * (_r2 + .5), _h1, cA1 * (_r2 + .5),
            0, _h2 + 3, 0,
        )







        colorsTopElem.push(
            ...fillColorFace(color1),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color1),
            ...fillColorFace(lCol),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(lCol),
            ...color1,
            ...color1,
            ...color1,
            ...lCol,
            ...lCol,
            ...lCol,
        )

        uvTopElem.push(
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, 1], [0, 1], [0, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, 1], [0, 1], [0, 1], [0, 1],),
            ...[0, .5],
            ...[.5, .5],
            ...[.25, 1],

            ...[0, 1],
            ...[0, 1],
            ...[0, 1],
        )

    }


    //console.log(vertTopElem)

    return {
        vertTopElem,
        colorsTopElem,
        uvTopElem,
    }
}