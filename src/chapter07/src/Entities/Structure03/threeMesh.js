import * as THREE from "three";

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
        '2': { r: -Math.PI / 2, g: 'elem_L',  },
        '3': { r: -Math.PI, g: 'elem_L',  },
        '4': { r: -Math.PI * 1.5, g: 'elem_L',  },
        '5': { r: 0, g: 'elem_Y', },
        '6': { r: -Math.PI / 2, g: 'elem_Y',  },
        '7': { r: -Math.PI, g: 'elem_Y',  },
        '8': { r: -Math.PI * 1.5, g: 'elem_Y',  },
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
            mesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
            root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
        }
    }
}
