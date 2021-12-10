import * as THREE from 'three'
// import { FRAME_UPDATE } from '../constants/constants_elements'
import { Bot } from '../Entities/Bot'


const S = 175.335
const H = 70
const H_BOT = 14


export class Bots {
    constructor(gameContext) {
        const { assets, emitter, store, studio, materials } = gameContext

        Bot.botMaterial = materials.iron
        Bot.botScene = assets.bot



        const groupBots = new THREE.Group()
        studio.addToScene(groupBots)


        const arrBots = []
        this.arrBots = arrBots


        let botRooms = null
        if (gameContext['level'] && gameContext['level'].collisionsBotsRooms) {
            botRooms = gameContext['level'].collisionsBotsRooms
        }


        for (let i = 0; i < 5; ++i) {
            const bot = new Bot()
            groupBots.add(bot.container)
            bot.container.position.set(-30 + i * 30, -92, 750)
            bot.inScene = 'aaa'
            botRooms && bot.setCollisionMesh(botRooms['collision_r_01'].clone())
            arrBots.push(bot)
        }




        emitter.subscribe('frameUpdate')(data => {
            for (let i = 0; i < arrBots.length; ++i) arrBots[i].inScene && arrBots[i].update(data)
        })




       // const initState = store.getState()
        //let saveIsStartCorridorShow = initState.ui.level.isStartCorridorShow

        // store.subscribe(() => {
        //     const newState = store.getState()
        //     if (saveIsStartCorridorShow && saveIsStartCorridorShow !== newState.ui.level.isStartCorridorShow) {
        //         saveIsStartCorridorShow = newState.ui.level.isStartCorridorShow
        //
        //         for (let i = 0; i < arrBots.length; ++i) {
        //             arrBots[i].inScene = null
        //             arrBots[i].container.position.y = -10000
        //             arrBots[i].removeCollisionMesh()
        //         }
        //     }
        // })






        emitter.subscribe('levelChanged')(({ objKey, kv, isAddBot, isRemoveBot }) => {
            if (isAddBot) {
                for (let i = 0; i < arrBots.length; ++i) {
                    if (!arrBots[i].inScene) {
                        arrBots[i].inScene = objKey
                        arrBots[i].container.position.set(kv[0] * S, kv[1] * H + H_BOT, kv[2] * S)
                        botRooms && arrBots[i].setCollisionMesh(botRooms['collision_r_01'].clone())
                        break;
                    }
                }
            }
            if (isRemoveBot) {
                for (let i = 0; i < arrBots.length; ++i) {
                    if (arrBots[i].inScene === objKey) {
                        arrBots[i].inScene = null
                        arrBots[i].container.position.y = -10000
                        arrBots[i].removeCollisionMesh()
                    }
                }
            }
        })
    }
}
