import * as THREE from 'three'


export function createComponentRayCast (objFrom, objTo, offset) {
    const vecStart = new THREE.Vector3()
    const vecDir = new THREE.Vector3()
    const rayCaster = new THREE.Raycaster(vecStart, vecDir)

    let arrMeshes = []

    return {
        check () {
            objFrom.getWorldPosition(vecStart)
            objTo.getWorldPosition(vecDir)

            vecDir.sub(vecStart)

            const intersects = rayCaster.intersectObjects(arrMeshes)

            return intersects[0] && intersects[0].distance < offset && intersects[0]
        },
        setItem (mesh) {
            arrMeshes.push(mesh)
        },
        removeItem (mesh) {
            arrMeshes = arrMeshes.filter(item => item === mesh)
        }
    }
}