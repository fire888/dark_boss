import { createBridge } from '../entities/Bridge'


export class SystemBridge {
    constructor (root) {
        const {
            emitter,
            materials,
            studio,
            systemCollisionFloor,
            CONSTANTS,
        } = root

        const {
            BRIDGE_START_STATE,
            PROGRAMS,
            playerConfig,
        } = CONSTANTS

        this._PROGRAMS = PROGRAMS

        this._bridge = createBridge(materials.wall)
        studio.addToScene(this._bridge.mesh)
        this._bridge.setPose(BRIDGE_START_STATE)


        systemCollisionFloor     
            && systemCollisionFloor.setItemToCollision({ 
                mesh: this._bridge.mesh, 
                dist: playerConfig.offsetFromFloor,
                isStopUnits: true,
            })

        this._inProgram = false
    }

    startProgram(key) {
        this._inProgram = true
        this._bridge.startProgram(this._PROGRAMS[key])
            .then(() => this._inProgram = false)
    }
}

// export function createSystemBridge (emitter, material) {
//     const bridge = createBridge(material)
//     bridge.setPose(START_STATE)

//     // TODO: remove.
//     emitter.subscribe('updateBridge')(data => bridge.setPose(getValuesFromData(data)))

//     let inProgram = false
//     emitter.subscribe('startBridgeProgram')(data=> {
//         if (inProgram) return;
//         if (!PROGRAMS[data.keyProgram]) return;

//         inProgram = true
//         bridge.startProgram(PROGRAMS[data.keyProgram])
//             .then(() => inProgram = false)
//     })

//     return {
//         mesh: bridge.mesh
//     }
// }



// const getValuesFromData = data => {
//     const newData = {}
//     for (let key in data) newData[key] = data[key].val
//     return newData
// }