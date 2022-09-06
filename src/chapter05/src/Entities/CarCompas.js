import * as THREE from 'three'

export const createCarCompas = root => {
    const {
        assets,
        studio,
    } = root

    const arrow = root.system_Level._items.arrow

    //const target = new THREE.Object3D()
    const target = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    target.position.set(-500, -30, -500)
    studio.addToScene(target)

    const src = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    src.position.set(0, 0, 0)
    studio.addToScene(target)

    const v = new THREE.Vector3()

    return {
        addToParent: parent => { 
            parent.add(arrow)
        },
        setArrowPosition: (x, y, z) => {
            arrow.position.set(x, y, z)
        },
        setTargetPosition: pos => {
            target.position.copy(pos)
        },
        update: () => {
            src.position.copy(arrow.parent.position)
            src.lookAt(target.position)
            if (arrow.parent.position.z < target.position.z) {
                arrow.rotation.y = -arrow.parent.rotation.y + src.rotation.y
            }
            else {
                arrow.rotation.y = -arrow.parent.rotation.y - src.rotation.y + Math.PI
            }
        }
    }
}