import * as THREE from 'three'




export class system_Monsters {
    constructor(root) {
        const { 
            studio, 
            assets, 
            materials, 
            emitter,
        } = root

        //assets.bot.position.fromArray([-1855.9946632526953, 2120.171875, -90.80075096163549])
        //assets.bot.traverse(item => {
        //    item.material = materials['skin']
        //})

        console.log(assets.bot)

        const bot = assets.bot.scene.children[0]
        bot.traverse(item => {
            item.material = materials['skin']
        })
        bot.position.fromArray([-1855.9946632526953, 2120.171875, -90.80075096163549])
        studio.addToScene(bot)


        this._animations = assets.bot.animations
        this._mixer = new THREE.AnimationMixer(bot)
        this._walkAction = this._mixer.clipAction(this._animations[1])
        this._walkAction.play()
        this._walkAction.timeScale = 3

        emitter.subscribe('frameUpdate')(data => {
            this._mixer.update(data.delta)
            bot.position.z += 0.13
        })
        
    }
}

