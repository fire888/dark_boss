import * as THREE from 'three'

const MONSTERS_DATA = {
    '0': {
        pos: [0, -53, -10.680000000000003],
        rot: [0, 0, 0],
        itemsToWalk: null,
    },
    '4': {
        pos: [-697.1507105430046, -30, 278.81390042624884],
        rot: [0, Math.PI / 2, 0],
        itemsToWalk: '4'
    },
    '13': {
        pos: [-946.6448542936033, 1263, 12.835633240896737],
        rot: [0, Math.PI / 2, 0],
        itemsToWalk: '13',
    },
    '20': {
        pos: [-2145.4767672182593, 2118.171875, 4.885100091204412],
        rot: [0, Math.PI / 2, 0],
        itemsToWalk: null,
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


        this._bot = assets.bot.scene.children[0]
        this._bot.traverse(item => {
            item.material = materials['skin']
        })


        studio.addToScene(this._bot)
        //this._frontObj = new THREE.Object3D()
        this._frontObj = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        )
        this._frontObj.position.set(0, 0, 5)
        this._bot.add(this._frontObj)


        this._animations = assets.bot.animations
        this._mixer = new THREE.AnimationMixer(this._bot)
        this._dialogAction = this._mixer.clipAction(this._animations[2])
        this._dialogAction.play()
        this._dialogAction.timeScale = 1.5

        this._walkAction = this._mixer.clipAction(this._animations[0])
        //this._walkAction.play()
        this._walkAction.timeScale = 3

        this._stayAction = this._mixer.clipAction(this._animations[1])
        //this._stayAction.play()
        this._stayAction.timeScale = 1

        emitter.subscribe('frameUpdate')(data => {
            if (!this._bot.visible) return;

            this._mixer.update(data.delta)
            //bot.position.z += 0.13
        })


        const arrWas = [] 
        emitter.subscribe('levelChanged')(index => {
            if (index === 12) {
                for (let i = 0; i < arrWas.length; ++i) {
                    if (arrWas[i] === 13) return;
                }
                arrWas.push(13)
                this.setBotTo(13)
            }
            if (index === 19) {
                for (let i = 0; i < arrWas.length; ++i) {
                    if (arrWas[i] === 20) return;
                }
                arrWas.push(20)
                this.setBotTo(20)
            }
        })
    }

    setBotTo(val) {
        const { pos, rot } = MONSTERS_DATA[val]
        this._bot.position.fromArray(pos)
        this._bot.rotation.fromArray(rot)
    }
}

