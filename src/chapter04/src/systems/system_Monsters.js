import * as THREE from 'three'

const ran = Math.random


const MONSTERS_DATA = {
    '0': {
        pos: [0, -55, -10.680000000000003],
        rot: [0, 0, 0],
        walkData: null,
        defaultAnimation: 'dialog',
    },
    '4': {
        pos: [-697.1507105430046, -31, 278.81390042624884],
        rot: [0, Math.PI / 2, 0],
        walkData: '4',
        defaultAnimation: 'walk',
    },
    '13': {
        pos: [-946.6448542936033, 1263, 12.835633240896737],
        rot: [0, Math.PI / 2, 0],
        walkData: '13',
        defaultAnimation: 'walk',

    },
    '20': {
        pos: [-2145.4767672182593, 2118.171875, 4.885100091204412],
        rot: [0, Math.PI, 0],
        walkData: null,
        defaultAnimation: 'stay',
    },
}





export class system_Monsters {
    constructor(root) {
        const {
            studio,
            assets,
            materials,
            emitter,
        } = root


        this._currentArea = null

        this._bot = assets.bot.scene.children[0]
        this._bot.traverse(item => {
            item.material = materials['skin']
        })


        this._frontObj = new THREE.Object3D()
        this._frontObj.position.set(0, 0, .1)
        this._bot.add(this._frontObj)
        this._bot.scale.set(1.15, 1.15, 1.15)


        this._animations = createAnimations(assets.bot)
        this._animations.play('walk')


        this._freeWalk = createFreeWalk(this._bot, this._frontObj, 20, emitter)
        this._areas = assets.areas


        studio.addToScene(this._bot)


        emitter.subscribe('frameUpdate')(data => {
            if (!this._bot.visible) return;

            this._animations.update(data)
        })


        /** if player move to next/previous area do not reset bot */
        const arrWas = []

        emitter.subscribe('levelChanged')(index => {
            if (index === 12) {
                /** if player move to next/previous area do not reset bot */
                for (let i = 0; i < arrWas.length; ++i) {
                    if (arrWas[i] === 13) return;
                }
                arrWas.push(13)
                this.setBotTo(13)
            }
            if (index === 19) {
                /** if player move to next/previous area do not reset bot */
                for (let i = 0; i < arrWas.length; ++i) {
                    if (arrWas[i] === 20) return;
                }
                arrWas.push(20)
                this.setBotTo(20)
            }
        })
    }

    setBotTo (val) {
        this._currentArea = val

        const { pos, rot, walkData, defaultAnimation } = MONSTERS_DATA[val]

        this._animations.play(defaultAnimation)

        if (walkData) {
            this._freeWalk.clearCollisions()
            for (let i = 0; i < this._areas[walkData].length; ++i) {
                this._freeWalk.setItemToCollision(this._areas[walkData][i])
            }
            this._freeWalk.start()
        } else {
            this._freeWalk.stop()
        }


        this._bot.position.fromArray(pos)
        this._bot.rotation.fromArray(rot)
    }

    getBot () {
        return this._bot
    }

    getCurrentArea () {
        return this._currentArea
    }

    startDialog (playerPos) {
        this._freeWalk.stop()
        this._animations.play('dialog')
        const plPos = new THREE.Vector3(playerPos.x, this._bot.position.y, playerPos.z)
        this._bot.lookAt(plPos)
    }

    stopDialog () {
        const { walkData, defaultAnimation } = MONSTERS_DATA[this._currentArea]

        walkData && this._freeWalk.start()
        this._animations.play(defaultAnimation )
    }
}





/** ANIMATION MANAGER ****************************************/

const createAnimations = assetsBot => {
    const animations = assetsBot.animations
    const mixer = new THREE.AnimationMixer(assetsBot.scene.children[0])

    const dialog = mixer.clipAction(animations[2])
    dialog.timeScale = 1.5

    const walk = mixer.clipAction(animations[0])
    walk.timeScale = 3

    const stay = mixer.clipAction(animations[1])
    stay.timeScale = 1


    const actions = {
        dialog,
        walk,
        stay,
    }

    let currentAction = null

    return {
        update: data => mixer.update(data.delta),
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

