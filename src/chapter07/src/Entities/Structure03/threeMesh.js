import * as THREE from "three";
import {system_PlayerMoveOnLevel} from "../../systems/system_PlayerMoveOnLevel";

export const createrMesh = (root) => {
    const m = new THREE.MeshPhongMaterial({ color: 0xff0000})

    const S = 40
    const SH = 20
    const SCALE = 4


    const TYPES = {
        '._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._': '0',
        '._._._._._._._._._._._._._.1._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._.1._._._._': '1',
        '._._._._.1._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._.1._._._._': '2',
        '._._._._.1._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._.1._._._._._._._._._._._._._': '3',
        '._._._._._._._._._._._._._.1._._._._._._._._._._._._._._._._._._._._._._._._._._.1._._._._._._._._._._._._._': '4',
        '._._._._.1._._._._._._._._._._._._._._._._._.1._._._._._._._._.1._._._._._._._._._._._._._._._._._._._._._._': '5',
        '._._._._._._._._._._._._._._._._._._._._._._.1._._._._._._._._.1._._._._._._._._.1._._._._._._._._._._._._._': '6',
        '._._._._._._._._._._._._._.1._._._._._._._._.1._._._._._._._._.1._._._._._._._._._._._._._._._._._._._._._._': '7',
        '._._._._._._._._._._._._._._._._._._._._._._.1._._._._._._._._.1._._._._._._._._._._._._._._._._._.1._._._._': '8',
    }

    const R = {
        '0': { r: 0, g: null, },
        '1': { r: 0, g: 'elem_L', },
        '2': { r: Math.PI / 2, g: 'elem_L',  },
        '3': { r: Math.PI, g: 'elem_L',  },
        '4': { r: Math.PI * 1.5, g: 'elem_L',  },
        '5': { r: 0, g: 'elem_L', },
        '6': { r: Math.PI / 2, g: 'elem_Y',  },
        '7': { r: Math.PI, g: 'elem_Y',  },
        '8': { r: Math.PI * 1.5, g: 'elem_Y',  },
    }

    const G = {
        'elem_L': root.assets['elem_L'].children[0].geometry,
        'elem_Y': root.assets['elem_Y'].children[0].geometry,
    }

    console.log( root.assets['elem_L'])


    return {
        addMesh: (tile) => {
            const {i, j, k, tileData } = tile
            const keyDataGeom = TYPES[tileData.typeHash]
            const props = R[keyDataGeom]

            const mesh = new THREE.Mesh(
                G[props.g],
                m,
            )
            root.studio.addToScene(mesh)
            mesh.rotation.y = props.r
            mesh.scale.set(SCALE, SCALE, SCALE)
            mesh.position.set(S * i * SCALE, SH * j * SCALE - 160, S * SCALE * k)
            root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
            console.log(mesh)

            // for (let i = 0; i < tile.length; ++i) {
            //     for (let j = 0; j < tile[i].length; ++j) {
            //         for (let k = 0; k < tile[i][j].length; ++k) {
            //             if (tile[i][j][k] === 1) {
            //                 const me = new THREE.Mesh(g, m)
            //                 me.position.set(
            //                     x * S + k * sS,
            //                     y * S + i * sS,
            //                     z * S + j * sS,
            //                 )
            //                 root.studio.addToScene(me)
            //             }
            //         }
            //     }
            // }
        }
    }
}
