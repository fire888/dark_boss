// https://www.artstation.com/artwork/AqP9Wq
// import * as THREE from 'three'
//
//
// import { pipeLineForInit } from '../../_CORE/pipeLines/initPipeLine'
// import * as CONSTANTS from './constants/constants_elements'
// import { GAME_MODULES } from "./constants/constants_modules"
import { initPipeline } from './actions/initPipeline'
import * as CONSTANTS from './constants/constants_elements'


window.addEventListener('load', () => {
    initPipeline(CONSTANTS).then()
})
