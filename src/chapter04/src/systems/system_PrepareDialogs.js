import * as THREE from 'three'



export class system_PrepareDialogs {
    constructor (root) {

        console.log(root)

        const {
            emitter,
            player,
            system_Monsters,
            dispatcher,
        } = root

        const bot = system_Monsters.getBot()

        let isBlocked = {
            'forward': false,
            'back': false,
        }

        const vecFront = new THREE.Vector3()


        let isButtonDialog = false


        emitter.subscribe('playerMove')(dir => {
            player.frontObj.getWorldPosition(vecFront)

            if (vecFront.distanceTo(bot.position) > 50) {
                if (isButtonDialog) {
                    isButtonDialog = false
                    dispatcher.dispatch({ type: 'TOGGLE_BUTTON', isButtonDialog: false })
                    system_Monsters.stopDialog()
                }
                return;
            } else {
                if (!isButtonDialog) {
                    isButtonDialog = true
                    dispatcher.dispatch({ type: 'TOGGLE_BUTTON', isButtonDialog: true, currentBot: system_Monsters.getCurrentArea() })
                    system_Monsters.startDialog(player.mesh.position)
                }
            }

            if (dir === 'forward') {

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
