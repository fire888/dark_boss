import { pipeLineForInit } from '../../_CORE/pipeLines/initPipeLine'
import * as CONSTANTS from './constants/constants_elements'
// import * as REPLICIES from "./constants/constants_replicies.js";

// ********** CHAPTER03 ****************

import { GAME_MODULES } from "./constants/constants_modules"
window.addEventListener('load', () => pipeLineForInit(GAME_MODULES, { ...CONSTANTS, /*REPLICIES*/ }))
