import * as THREE from "three";
import { createModelTerminal } from '../entities/Terminal'

export class SystemTerminals {
    constructor (root) {
        const {
            //materials,
            assets,
            studio,
            emitter,
        } = root

        const {
            TERMINALS_CONFIG,
        } = root.CONSTANTS

        this.terminals = {}

        const createTerminal = config => {
            const terminal = createModelTerminal(assets['terminal'], config, emitter)
            terminal.mesh.userData.inScene = true
            terminal.mesh.userData.key = config.terminalKey
            studio.addToScene(terminal.mesh)
            this.terminals[config.terminalKey] = terminal
        }

        for (let i = 0; i < TERMINALS_CONFIG.length; i ++) createTerminal(TERMINALS_CONFIG[i])

        //emitter.subscribe('toggleTerminal')(data => {
            // if (!this.terminals[data.terminalKey]) return;
            //
            // data.isOpen
            //     ? this.terminals[data.terminalKey].startOpen()
            //     : this.terminals[data.terminalKey].startClose()

            //data.terminalKey === 'TERMINAL_06' && !data.isOpen && createTerminal(LAST_TERMINAL_CONFIG)
        //})
    }

    openTerminal (key) {
        this.terminals[key].startOpen()
    }

    closeTerminal (key) {
        this.terminals[key].startClose()
    }
}

// import { createModelTerminal } from './component_modelTerminal'
// import { TERMINALS_CONFIG, LAST_TERMINAL_CONFIG } from './constants_elements'
//
//
//
// export function createSystemTerminals (model, emitter, addToScene, addItemToNearChecker) {
//     const terminals = {}
//
//     const createTerminal = config => {
//         const terminal = createModelTerminal(model, config, emitter)
//         terminals[config.terminalKey] = terminal
//         addToScene(terminal.mesh)
//         addItemToNearChecker(terminal.mesh)
//     }
//
//     for (let i = 0; i < TERMINALS_CONFIG.length; i ++) createTerminal(TERMINALS_CONFIG[i])
//
//     emitter.subscribe('toggleTerminal')(data => {
//         if (!terminals[data.terminalKey]) return;
//
//         data.isOpen
//             ? terminals[data.terminalKey].startOpen()
//             : terminals[data.terminalKey].startClose()
//
//         data.terminalKey === 'TERMINAL_06' && !data.isOpen && createTerminal(LAST_TERMINAL_CONFIG)
//     })
// }

