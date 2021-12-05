import { createBot } from '../entities/Bot'
import { GLTFCopy } from '../../../_CORE/helpers/helper_GLTFcopy' 


export class SystemBots {
    constructor (root) {
        const { 
            assets, 
            materials, 
            studio, 
            emitter,
        } = root
    
        this.bots = {}

        root.CONSTANTS.BOTS.forEach(item => {
            const unit = createBot(
                GLTFCopy(assets.bot), 
                materials.bot, 
                item,
                root,
            )
            unit.mesh.position.set(item.pos[0], item.pos[1], item.pos[2])
            unit.mesh.rotation.y = item.rot
            unit.name = item.name
            studio.addToScene(unit.mesh)
            unit.mesh.userData.inScene = true
            unit.mesh.userData.key = item.name
            this.bots[item.name] = unit
        })


        emitter.subscribe('frameUpdate')(data => {
            for (let key in this.bots) {
                this.bots[key].update(data)
            }
        })
    }
}