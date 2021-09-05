import * as THREE from 'three'

export function createBot (monsterModel, monsterMat, componentsArr, root) {
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
    mixer.timeScale = 0.7 
    walkAnimate.play()


    let state = 'walk' // || 'stay' 
    let isUpdate = false


    const components = {}
    for (let i = 0; i < componentsArr.length; i++) {
        const { key, func } = componentsArr[i] 
        components[key] = func(group, objRay, offsetWallCollision, root)
    }

    return ({ 
        mesh: group,
        isUpdate,
        update (data) {
            if (state === 'walk') { 
                components['freeWalk'] && components['freeWalk'].update(data)
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