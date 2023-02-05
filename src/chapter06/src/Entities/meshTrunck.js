import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js'



const getRandomCoordsOfRoom = (room) => {
    const minX = room.walls.n.p0[0]
    const maxX = room.walls.n.p1[0]
    const minZ = room.walls.e.p0[1]
    const maxZ = room.walls.e.p1[1]
    const diffX = maxX - minX
    const diffZ = maxZ - minZ
    const x = minX + diffX * 0.2 + Math.random() * diffX * 0.6
    const z = minZ + diffZ * 0.2 + Math.random() * diffZ * 0.6

    return { x, z }
}



const generate = (count, r, s = 1) => {
    const v = []

    for (let i = 0; i < count; ++i) {
        const radius = Math.random() * r
        const angle = Math.random() * Math.PI * 2
        const angle2 = Math.random() * Math.PI * 2

        const x = Math.sin(angle) * radius
        const y = Math.sin(angle2) * Math.random() * 50
        const z = Math.cos(angle) * radius


        for (let i = 0; i < 3; ++i) {
            v.push(
                x + Math.random() * s,
                y + Math.random() * s,
                z + Math.random() * s,
            )
        }
    }

    return v
}



const startWaiter = (time, onWait) => {
    const timer = setTimeout(() => {
        onWait()
    }, time)

    return () => clearTimeout(timer)
}




export const createFractions = (root) => {
    /** mesh */
    const modelSrc = root.assets.bodyModel.children[0]
    const mesh = new THREE.Mesh(modelSrc.geometry, root.materials.body)
    const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        root.materials.bodyShadow,
    )
    shadow.rotation.x = -Math.PI/ 2
    shadow.position.y = .1
    shadow.position.z = -.8
    mesh.add(shadow)
    const meshCollision = new THREE.Mesh(
        new THREE.BoxGeometry(10, 140, 10),
        root.materials.bodyShadow,
    )
    mesh.add(meshCollision)
    meshCollision.visible = false



    const arrAppear = [
        generate(mesh.geometry.attributes.position.array.length / 9, 200 * Math.random(), 0),
        generate(mesh.geometry.attributes.position.array.length / 9, 50 * Math.random(), Math.random() + 1),
        generate(mesh.geometry.attributes.position.array.length / 9, 20 * Math.random(), Math.random() + 2),
        [...modelSrc.geometry.attributes.position.array],
    ]
    const arrHide = [
        [...modelSrc.geometry.attributes.position.array],
        generate(mesh.geometry.attributes.position.array.length / 9, 15 * Math.random(), Math.random() + 2),
        generate(mesh.geometry.attributes.position.array.length / 9, 2 * Math.random(), Math.random() + 1),
        generate(mesh.geometry.attributes.position.array.length / 9, 1 * Math.random(), 0),
    ]


    const startIterate = (key, arr, x, z, phaseComplete = 1, onComplete = null) => {
        const TIME_SINGLE_ITERATION = 300
        let tween = null

        const iterate = (n) => {
            if (!arr[n]) {
                //onComplete && onComplete()
                return;
            }

            const v = { v : 0 }
            tween = new TWEEN.Tween(v)
                .to({
                    v: 1,
                }, TIME_SINGLE_ITERATION)
                .onUpdate(() => {
                    for (let i = 0; i < mesh.geometry.attributes.position.array.length; ++i) {
                        mesh.geometry.attributes.position.array[i] = v.v * arr[n][i] + (1 - v.v) * arr[n - 1][i]
                    }
                    if (key === 'show' && n === arrAppear.length - 1) {
                        shadow.material.opacity = v.v
                    }
                    if (key === 'hide' && n === 1) {
                        shadow.material.opacity = 1 - v.v
                    }
                    mesh.geometry.attributes.position.needsUpdate = true
                })
                .onComplete(() => {
                    iterate(n + 1)
                })
                .start()
        }

        iterate(1)

        const t = TIME_SINGLE_ITERATION * arr.length * phaseComplete
        setTimeout(() => {
            tween && tween.stop && tween.stop()
            onComplete && onComplete()
        }, t)

        setTimeout(() => {
            if (!x && !z) {
                return;
            }
            shadow.material.opacity = 0
            mesh.position.x = x
            mesh.position.z = z
            mesh.rotation.y = Math.random() * Math.PI * 2
        }, 50)

        return () => {
            tween.stop()
        }
    }


    let stopWaitAnimationHide = null
    let stopperTween = () => {}
    let isMustHide = true

    root.emitter.subscribe('playerMove')(dir => {
        if (isMustHide && stopWaitAnimationHide) {
            if (
                Math.abs(root.player.mesh.position.x - mesh.position.x) < 45 &&
                Math.abs(root.player.mesh.position.z - mesh.position.z) < 45
            ) {
                stopperTween()
                stopWaitAnimationHide()
                stopWaitAnimationHide = null
                startIterate('hide', arrHide, null, null, 1,null)
            }
        }
        // if (!isMustHide) {
        //     if (
        //         Math.abs(root.player.mesh.position.x - mesh.position.x) < 15 &&
        //         Math.abs(root.player.mesh.position.z - mesh.position.z) < 15
        //     ) {
        //         //root.player.
        //     }
        // }
    })

    return {
        m: mesh,
        mCollision: meshCollision,
        update: () => {},
        setRoom: (r, phaseComplete, isNotHide = null) => {
            isMustHide = !isNotHide
            //console.log(phaseComplete)
            stopWaitAnimationHide && stopWaitAnimationHide()
            const coords = getRandomCoordsOfRoom(r)
            stopperTween = startIterate('show', arrAppear, coords.x, coords.z, phaseComplete, () => {})
            if (isMustHide) {
                let t = Math.random() * 20000 + 1300
                stopWaitAnimationHide = startWaiter(t, () => {
                    startIterate('hide', arrHide, null, null, 1, () => {
                        stopWaitAnimationHide = null
                    })
                })
            }
        }
    }
}