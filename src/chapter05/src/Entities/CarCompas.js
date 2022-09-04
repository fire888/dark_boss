import * as THREE from 'three'

export const createCarCompas = root => {
    const {
        assets,
        studio,
    } = root

    const arrow = root.system_Level._items.arrow

    const target = new THREE.Object3D()
    target.position.set(0, 0, 0)
    studio.addToScene(target)

    return {
        addToParent: parent => { 
            parent.add(arrow)
        },
        setArrowPosition: (x, y, z) => {
            arrow.position.set(x, y, z)
        },
        setTargetPosition: (x, y, z) => {
            console.log(x, y, z)
            target.position.x = x
            //const worldPosSrc = arrow.getWorldPosition()
            //target.position.y = worldPosSrc.y
            target.position.z = z 
        },
        update: () => {
            //arrow.lookAt(arrow.worldToLocal(target.matrixWorld.getPosition()))
            const v = new THREE.Vector3()
            v.setFromMatrixPosition(target.matrixWorld)
            arrow.lookAt(arrow.worldToLocal(v))
        }
    }
}