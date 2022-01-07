import * as THREE from 'three'



export class system_PrepareDialogs {
    constructor (root) {

        const {
            emitter,
            player,
            system_Monsters,
        } = root

        const bot = system_Monsters.getBot()

        let isBlocked = {
            'forward': false,
            'back': false,
        }

        const vecFront = new THREE.Vector3()

        emitter.subscribe('playerMove')(dir => {
            if (dir === 'forward') {
                player.frontObj.getWorldPosition(vecFront)
                if (vecFront.distanceTo(bot.position) < 30 && !isBlocked[dir]) {
                    isBlocked[dir] = true
                    player.toggleCanMove(dir, false)
                    system_Monsters.startDialog(player.mesh.position)
                }
            }

            if (isBlocked['forward']) {
                isBlocked['back'] = false
                player.toggleCanMove('back', true)
            }
        })

        emitter.subscribe('frameUpdate')(() => {
            if (player.mesh.position.distanceTo(bot.position) > 30 && (isBlocked['forward'] || isBlocked['back'])) {
                isBlocked['forward'] = false
                isBlocked['back'] = false
                player.toggleCanMove('forward', true)
                player.toggleCanMove('back', true)
                system_Monsters.stopDialog()
            }
        })

    }
}
