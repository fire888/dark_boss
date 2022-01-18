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
            LAST_TERMINAL_CONFIG,
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
        
        createTerminal(LAST_TERMINAL_CONFIG)
        this.terminals['TERMINAL_LAST'].mesh.visible = false

        /** comment */
        //this.addLastTerminal()
    }

    openTerminal (key) {
        this.terminals[key].startOpen()
    }

    closeTerminal (key) {
        this.terminals[key].startClose()
    }

    addLastTerminal () {
        this.terminals['TERMINAL_LAST'].mesh.visible = true
    }
}
