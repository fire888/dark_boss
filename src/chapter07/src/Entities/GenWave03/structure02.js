import { createDataTiles } from './create_DATA_TILES'
import { prepareCacheResults } from './prepareCacheResults'
import { createMap } from './createMapFromTiles'
import * as THREE from 'three'

export const createStructure2 = root => {
    const tiles = createDataTiles()
    const tilesWithCachesResults = prepareCacheResults(tiles)
    const dataStructure = createMap(tilesWithCachesResults)


    const g = new THREE.BoxGeometry(10, 10, 10)
    const m = new THREE.MeshPhongMaterial({ color: 0xff0000})

    const S = 30
    const sS = S / 3


    const createM = (t, y, z, x) => {
        for (let i = 0; i < t.length; ++i) {
            for (let j = 0; j < t[i].length; ++j) {
                for (let k = 0; k < t[i][j].length; ++k) {
                    if (t[i][j][k] === 1) {
                        const me = new THREE.Mesh(g, m)
                        me.position.set(
                            x * S + k * sS,
                            y * S + i * sS,
                            z * S + j * sS,
                        )
                        root.studio.addToScene(me)
                    }
                }
            }
        }
    }



    for (let i = 0; i < dataStructure.length; ++i) {
        for (let j = 0; j < dataStructure[i].length; ++j) {
            for (let k = 0; k < dataStructure[i][j].length; ++k) {
                createM(dataStructure[i][j][k].test_resultTile.tile, i, j, k)
            }
        }
    }

}



// import { ARR_TILES, SRC } from "./TILES";
//
// const S_Z = 50
// const S_X = 50
//
// const MAP = []
//
// // export const createMap = () => {
// //     const compareSide = (s1, s2) => {
// //         for (let i = 0; i < s1.length; ++i) {
// //             if (s1[i] !== s2[i]) {
// //                 return false
// //             }
// //         }
// //         return true
// //     }
// //
// //     const fillMap = (i, j) => {
// //         let w = 0
// //         if (MAP[i][j - 1] && MAP[i][j - 1] !== 10) {
// //             w = MAP[i][j - 1].e
// //         }
// //         let e = 0
// //         if (MAP[i][j + 1] && MAP[i][j + 1] !== 10) {
// //             e = MAP[i][j - 1].w
// //         }
// //         let n = 0
// //         if (MAP[i - 1] && MAP[i - 1][j] && MAP[i - 1][j] !== 10) {
// //             n = MAP[i - 1][j].s
// //         }
// //         let s = 0
// //         if (MAP[i + 1] && MAP[i + 1][j] && MAP[i + 1][j] !== 10) {
// //             s = MAP[i + 1][j].n
// //         }
// //         const startIndex = Math.floor(Math.random() * ARR_TILES.length)
// //
// //         for (let ind = startIndex; ind < ARR_TILES.length; ++ind) {
// //             let isCompare = true
// //             if (n && !compareSide(ARR_TILES[ind].n, n)) {
// //                 isCompare = false
// //             }
// //             if (s && !compareSide(ARR_TILES[ind].s, s)) {
// //                 isCompare = false
// //             }
// //             if (w && !compareSide(ARR_TILES[ind].w, w)) {
// //                 isCompare = false
// //             }
// //             if (e && !compareSide(ARR_TILES[ind].e, e)) {
// //                 isCompare = false
// //             }
// //             if (isCompare) {
// //                 return ARR_TILES[ind]
// //             }
// //         }
// //         for (let ind = 0; ind < startIndex; ++ind) {
// //             let isCompare = true
// //             if (n && !compareSide(ARR_TILES[ind].n, n)) {
// //                 isCompare = false
// //             }
// //             if (s && !compareSide(ARR_TILES[ind].s, s)) {
// //                 isCompare = false
// //             }
// //             if (w && !compareSide(ARR_TILES[ind].w, w)) {
// //                 isCompare = false
// //             }
// //             if (e && !compareSide(ARR_TILES[ind].e, e)) {
// //                 isCompare = false
// //             }
// //             if (isCompare) {
// //                 return ARR_TILES[ind]
// //             }
// //         }
// //         return 10
// //     }
// //
// //
// //
// //     console.log('!!!', SRC)
// //     MAP.push([])
// //     for (let i = 0; i < SRC.length; ++i) {
// //         MAP[0].push(SRC[i])
// //     }
// //
// //     return MAP
// // }
//
// export const createMap = () => {
//     for (let i = 0; i < S_Z; ++i) {
//         const arr = []
//         for (let j = 0; j < S_X; ++j) {
//             arr.push(10)
//         }
//         MAP.push(arr)
//     }
//
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
//         /** check sides **** */
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
//
//         /** random start index of tiles */
//         const startIndex = Math.floor(Math.random() * ARR_TILES.length)
//         const arrInd = []
//         for (let ind = startIndex; ind < ARR_TILES.length; ++ ind) {
//             arrInd.push(ind)
//         }
//         for (let ind = 0; ind < startIndex; ++ ind) {
//             arrInd.push(ind)
//         }
//
//
//         /** check is can tile insert ****/
//         for (let k = 0; k < arrInd.length; ++k) {
//             const ind = arrInd[k]
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
//
//     for (let i = 0; i < MAP.length; ++i) {
//         for (let j = 0; j < MAP[i].length; ++j) {
//             if (MAP[i][j] !== 10 ) {
//                 continue;
//             }
//             if (
//                 i === 0 ||
//                 i === MAP.length - 1 ||
//                 j === 0 ||
//                 j === MAP[0].length - 1
//             ) {
//                 MAP[i][j] = ARR_TILES[1]
//                 continue;
//             }
//             const result = fillMap(i , j)
//             MAP[i][j] = result
//         }
//     }
//
//     return MAP
// }
