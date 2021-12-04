import * as THREE from 'three'
import { componentFreeWalkWithCustomWalls } from "../../../_CORE/components/componentFreeWalKWithCustomWalls";

export function createBot (monsterModel, monsterMat, botData, root) {
    const {
        offsetWallCollision,
    } = root.CONSTANTS.BOT


    const group = new THREE.Group()

    const obj = monsterModel.scene.children[1]
    obj.position.set(0, -8, 0)
    const m = obj.children[1] 


    const objRay = new THREE.Object3D()
    objRay.position.set(0, 0, 1)
    group.add(objRay)


    m.material = monsterMat 
    group.add(obj)
    let animations, mixer


    animations = monsterModel.animations
    mixer = new THREE.AnimationMixer(m)
    const walkAnimate = mixer.clipAction(animations[ 2 ])
    const actionAnimate = mixer.clipAction(animations[ 0 ])
    //actionAnimate.play()
    //mixer.timeScale = 0.3 
    mixer.timeScale = 0.7 
    walkAnimate.play()


    let state = 'walk' // || 'stay' || 'walk' 
    let isUpdate = false

    let freeWalk = null
    if (botData.keyWallToWalkCollisions) {
        freeWalk = componentFreeWalkWithCustomWalls(
            group, 
            objRay, 
            offsetWallCollision,
            [root.botsCustomWallsCollisions[botData.keyWallToWalkCollisions]], 
            root,
        )   
    }

    return ({ 
        mesh: group,
        isUpdate,
        update (data) {
            if (state === 'walk') { 
                freeWalk && freeWalk.update(data)
            }
            mixer.update(data.delta)
        },
        stay (playerPos) { 
            if (state === 'stay') return;
            state = 'stay'

            const vec3 = new THREE.Vector3()
            vec3.copy(playerPos)
            vec3.y = group.position.y
            group.lookAt(vec3)

            walkAnimate.stop()
            actionAnimate.play()
            mixer.timeScale = 0.3 
        },
        walk () { 
            if (state === 'walk') return; 
            state = 'walk'
            actionAnimate.stop()
            walkAnimate.play()
            mixer.timeScale = 0.7
        },
        startUpdate () {
            if (this.isUpdate) return;
            this.isUpdate = true
            walkAnimate.play()
            mixer.timeScale = 0.7 
        },
        stopUpdate () {
            if (!this.isUpdate) return;
            this.isUpdate = false
            walkAnimate.stop()
            actionAnimate.play()
            actionAnimate.stop()
        },
    })
}