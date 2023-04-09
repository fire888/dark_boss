import { ARR_TILES, SRC } from "./TILES";

const S_Z = 50
const S_X = 50

const MAP = []

// export const createMap = () => {
//     const compareSide = (s1, s2) => {
//         for (let i = 0; i < s1.length; ++i) {
//             if (s1[i] !== s2[i]) {
//                 return false
//             }
//         }
//         return true
//     }
//
//     const fillMap = (i, j) => {
//         let w = 0
//         if (MAP[i][j - 1] && MAP[i][j - 1] !== 10) {
//             w = MAP[i][j - 1].e
//         }
//         let e = 0
//         if (MAP[i][j + 1] && MAP[i][j + 1] !== 10) {
//             e = MAP[i][j - 1].w
//         }
//         let n = 0
//         if (MAP[i - 1] && MAP[i - 1][j] && MAP[i - 1][j] !== 10) {
//             n = MAP[i - 1][j].s
//         }
//         let s = 0
//         if (MAP[i + 1] && MAP[i + 1][j] && MAP[i + 1][j] !== 10) {
//             s = MAP[i + 1][j].n
//         }
//         const startIndex = Math.floor(Math.random() * ARR_TILES.length)
//
//         for (let ind = startIndex; ind < ARR_TILES.length; ++ind) {
//             let isCompare = true
//             if (n && !compareSide(ARR_TILES[ind].n, n)) {
//                 isCompare = false
//             }
//             if (s && !compareSide(ARR_TILES[ind].s, s)) {
//                 isCompare = false
//             }
//             if (w && !compareSide(ARR_TILES[ind].w, w)) {
//                 isCompare = false
//             }
//             if (e && !compareSide(ARR_TILES[ind].e, e)) {
//                 isCompare = false
//             }
//             if (isCompare) {
//                 return ARR_TILES[ind]
//             }
//         }
//         for (let ind = 0; ind < startIndex; ++ind) {
//             let isCompare = true
//             if (n && !compareSide(ARR_TILES[ind].n, n)) {
//                 isCompare = false
//             }
//             if (s && !compareSide(ARR_TILES[ind].s, s)) {
//                 isCompare = false
//             }
//             if (w && !compareSide(ARR_TILES[ind].w, w)) {
//                 isCompare = false
//             }
//             if (e && !compareSide(ARR_TILES[ind].e, e)) {
//                 isCompare = false
//             }
//             if (isCompare) {
//                 return ARR_TILES[ind]
//             }
//         }
//         return 10
//     }
//
//
//
//     console.log('!!!', SRC)
//     MAP.push([])
//     for (let i = 0; i < SRC.length; ++i) {
//         MAP[0].push(SRC[i])
//     }
//
//     return MAP
// }

export const createMap = () => {
    for (let i = 0; i < S_Z; ++i) {
        const arr = []
        for (let j = 0; j < S_X; ++j) {
            arr.push(10)
        }
        MAP.push(arr)
    }

    //MAP[0][0] = ARR_TILES[0]

    const compareSide = (s1, s2) => {
        for (let i = 0; i < s1.length; ++i) {
            if (s1[i] !== s2[i]) {
                return false
            }
        }
        return true
    }

    const fillMap = (i, j) => {
        let w = 0
        if (MAP[i][j - 1] && MAP[i][j - 1] !== 10) {
            w = MAP[i][j - 1].e
        }
        let e = 0
        if (MAP[i][j + 1] && MAP[i][j + 1] !== 10) {
            e = MAP[i][j - 1].w
        }
        let n = 0
        if (MAP[i - 1] && MAP[i - 1][j] && MAP[i - 1][j] !== 10) {
            n = MAP[i - 1][j].s
        }
        let s = 0
        if (MAP[i + 1] && MAP[i + 1][j] && MAP[i + 1][j] !== 10) {
            s = MAP[i + 1][j].n
        }
        const startIndex = Math.floor(Math.random() * ARR_TILES.length)

        for (let ind = startIndex; ind < ARR_TILES.length; ++ind) {
            let isCompare = true
            if (n && !compareSide(ARR_TILES[ind].n, n)) {
                isCompare = false
            }
            if (s && !compareSide(ARR_TILES[ind].s, s)) {
                isCompare = false
            }
            if (w && !compareSide(ARR_TILES[ind].w, w)) {
                isCompare = false
            }
            if (e && !compareSide(ARR_TILES[ind].e, e)) {
                isCompare = false
            }
            if (isCompare) {
                return ARR_TILES[ind]
            }
        }
        for (let ind = 0; ind < startIndex; ++ind) {
            let isCompare = true
            if (n && !compareSide(ARR_TILES[ind].n, n)) {
                isCompare = false
            }
            if (s && !compareSide(ARR_TILES[ind].s, s)) {
                isCompare = false
            }
            if (w && !compareSide(ARR_TILES[ind].w, w)) {
                isCompare = false
            }
            if (e && !compareSide(ARR_TILES[ind].e, e)) {
                isCompare = false
            }
            if (isCompare) {
                return ARR_TILES[ind]
            }
        }
        return 10
    }




    for (let i = 0; i < MAP.length; ++i) {
        for (let j = 0; j < MAP[i].length; ++j) {
            if (MAP[i][j] !== 10 ) {
                continue;
            }
            const result = fillMap(i , j)
            MAP[i][j] = result
        }
    }

    return MAP
}
