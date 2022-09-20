import {
    createFace,
    createUv,
    createFaceWithSquare,
    fillColorFace,
    fillColorFaceWithSquare
} from './helpers'

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

        vertTopElem.push(...createFace(
            [sin(angle1) * _r1, _h1, cos(angle1) * _r1],
            [sin(angle2) * _r1, _h1, cos(angle2) * _r1],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
        ))

        _h1 = _h2
        _h2 = _h1 + hl2
        _r1 = _r2
        _r2 = 3

        vertTopElem.push(...createFace(
            [sin(angle1) * _r1, _h1, cos(angle1) * _r1],
            [sin(angle2) * _r1, _h1, cos(angle2) * _r1],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
        ))


        _h1 = _h2
        _h2 = _h1 + hl3
        _r1 = _r2
        _r2 = _r1

        vertTopElem.push(...createFace(
            [sin(angle1) * _r1, _h1, cos(angle1) * _r1],
            [sin(angle2) * _r1, _h1, cos(angle2) * _r1],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
        ))

        _h1 = _h2
        _h2 = _h1 + hl4
        _r1 = _r2
        _r2 = _r1 + 4

        vertTopElem.push(...createFace(
            [sin(angle1) * _r1, _h1, cos(angle1) * _r1],
            [sin(angle2) * _r1, _h1, cos(angle2) * _r1],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
        ))



        _h1 = _h2
        _h2 = _h1 + hl5
        _r1 = _r2
        _r2 = _r1

        vertTopElem.push(...createFace(
            [sin(angle1) * _r1, _h1, cos(angle1) * _r1],
            [sin(angle2) * _r1, _h1, cos(angle2) * _r1],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
        ))


        vertTopElem.push(...createFace(
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle2) * 2, _h2, cos(angle2) * 2],
            [sin(angle1) * 2, _h2, cos(angle1) * 2],
        ))

        _h1 = _h2
        _h2 = _h1 + hl6
        _r1 = 2
        _r2 = 7

        vertTopElem.push(...createFace(
            [sin(angle1) * _r1, _h1, cos(angle1) * _r1],
            [sin(angle2) * _r1, _h1, cos(angle2) * _r1],
            [sin(angle2) * _r2, _h2, cos(angle2) * _r2],
            [sin(angle1) * _r2, _h2, cos(angle1) * _r2],
        ))


        _h1 = _h2
        _h2 = _h2 + hl6
        vertTopElem.push(
            sin(angle1) * _r2, _h1, cos(angle1) * _r2,
            sin(angle2) * _r2, _h1, cos(angle2) * _r2,
            0, _h2, 0,
        )







        colorsTopElem.push(
            ...fillColorFace(color1),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color2),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...color1,
            ...color1,
            ...color1,
        )

        uvTopElem.push(
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...createUv([0, .5], [.5, .5], [.5, 1], [0, 1],),
            ...[0, .5],
            ...[.5, .5],
            ...[.25, 1],
        )

    }


    //console.log(vertTopElem)

    return {
        vertTopElem,
        colorsTopElem,
        uvTopElem,
    }
}