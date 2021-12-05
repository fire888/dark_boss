import { createBridge } from '../entities/Bridge'


export class SystemBridge {
    constructor (root) {
        const {
            emitter,
            materials,
            studio,
            CONSTANTS,
        } = root

        const {
            BRIDGE_START_STATE,
            PROGRAMS,
        } = CONSTANTS

        const bridge = createBridge(materials.wall)
        studio.addToScene(bridge.mesh)
        bridge.setPose(BRIDGE_START_STATE)
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