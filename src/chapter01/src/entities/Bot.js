import * as THREE from 'three'


const ran = Math.random



export function createBot (monsterModel, monsterMat, botData, root) {
    const {
        emitter,
    } = root


    const group = new THREE.Group()


    const animations = createAnimations(monsterModel)
    animations.play('walk')


    const obj = monsterModel.scene.children[1]
    obj.children[1].material = monsterMat
    obj.position.set(0, -8, 0)


    const objRay = new THREE.Object3D()
    objRay.position.set(0, 0, 1)
    group.add(objRay)


    group.add(obj)


    let isUpdate = false


    const freeWalk = createFreeWalk(group, objRay, 20, emitter)
    freeWalk.setItemToCollision(root.botsCustomWallsCollisions[botData.keyWallToWalkCollisions])
    freeWalk.start()
    

    const boxCollisionWithPlayer = new THREE.Mesh(
       new THREE.BoxGeometry(6, 6, 6),
       new THREE.MeshBasicMaterial()
    )
    boxCollisionWithPlayer.position.y = -5
    boxCollisionWithPlayer.visible = false
    group.add(boxCollisionWithPlayer)
    root.systemCollisionItems.setItemToCollision({ mesh: boxCollisionWithPlayer })



    return ({ 
        mesh: group,
        isUpdate,
        update (data) {
            if (isUpdate) {
                return;
            }
            
            animations.update(data.delta)
        },
        stay (playerPos) { 
            freeWalk.stop()
            animations.play('dialog')

            const vec3 = new THREE.Vector3()
            vec3.copy(playerPos)
            vec3.y = group.position.y
            group.lookAt(vec3)
        },
        walk () { 
            freeWalk.start()
            animations.play('walk')
        },
        startUpdate () {
            if (isUpdate) return;
            isUpdate = true
            freeWalk.play()
            animations.play('walk')
        },
        stopUpdate () {
            if (!isUpdate) return;
            isUpdate = false
            freeWalk.stop()
        },
    })
}



/** ANIMATION MANAGER ****************************************/

const createAnimations = monsterModel => {
    const animations = monsterModel.animations
    const mixer = new THREE.AnimationMixer(monsterModel.scene.children[1].children[1])

    const dialog = mixer.clipAction(animations[0])
    dialog.timeScale = 0.3
    const walk = mixer.clipAction(animations[2])
    walk.timeScale = 0.7

    walk.play()


    const actions = { dialog, walk }
    let currentAction = null

    return {
        update: d => { 
            mixer.update(d)
        },
        play: key => {
            if (currentAction === key) return;

            currentAction = key

            mixer.stopAllAction()
            actions[key].play()
        },
    }
}




/** WALKING ***************************************************/


const startRotate = mesh => {
    const angleRot = (ran() * Math.PI * 1.5 + 1.3) * ran() < 0.5 ? 1 : -1
    const numRotations = 40
    const speed = angleRot / numRotations

    let countRotation = 0

    return () => {
        mesh.rotation.y += speed
        return ++countRotation < numRotations
    }
}



const startGo = (mesh, dist)  => {
    const speed = 0.15
    const numsMove = dist
        ? Math.min(dist / speed, ran() * 800 + 300)
        : null

    let countMove = 0

    return () => {
        if (!dist) {
            return false;
        }
        mesh.translateZ(speed)
        return ++countMove < numsMove
    }
}






const createFreeWalk = (mesh, meshFrontObj, wallOffset, emitter) => {
    let isUpdate = false
    const collisions = createCollisionWithItems()

    const actions = {
        'rotate': startRotate,
        'go': startGo,
    }

    let state = 'rotate' // || 'go'
    let currentAction = null


    const toggleAction = key => {
        if (!key) {
            state === 'rotate' && (key = 'go')
            state === 'go' && (key = 'rotate')
        }

        state = key
        const d = collisions.checkCollisions(mesh, meshFrontObj)
        currentAction = actions[key](mesh, Math.max(d - 20, 0))
    }


    toggleAction(state)


    emitter.subscribe('frameUpdate')(() => {
        if (!isUpdate) {
            return;
        }
        !currentAction() && toggleAction()
    })


    return {
        start: () => {
            toggleAction('rotate')
            isUpdate = true
        },
        stop: () => isUpdate = false,
        setItemToCollision: collisions.setItemToCollision,
        removeItemFromCollision: collisions.removeItemFromCollision,
        clearCollisions: collisions.clearCollisions,
    }
}



/** COLLISIONS *************************************************/

const createCollisionWithItems = () => {
        let arrMeshes = []

        const vecStart = new THREE.Vector3()
        const vecDir = new THREE.Vector3()
        const rayCaster = new THREE.Raycaster(vecStart, vecDir)


    return {
        setItemToCollision (mesh) {
            arrMeshes.push(mesh)
        },
        removeItemFromCollision (mesh) {
            arrMeshes = arrMeshes.filter(item => item !== mesh)
        },
        clearCollisions () {
            arrMeshes = []
        },
        checkCollisions (objFrom, objTo) {
            objFrom.getWorldPosition(vecStart)
            objTo.getWorldPosition(vecDir)

            vecDir.sub(vecStart)

            const intersects = rayCaster.intersectObjects(arrMeshes, true)

            if (intersects[0]) {
                return intersects[0].distance
            }

            return false
        }
    }
}
