//import { emitter } from './util_emitter'
import { TRANSLATE_WORLDS } from '../constants/constants_replicies'

let currentLanguage = 'en'

// emitter.subscribe('setLanguage')(keyLanguage => {
//     currentLanguage = keyLanguage
// })


export const t = val => (TRANSLATE_WORLDS[currentLanguage] && TRANSLATE_WORLDS[currentLanguage][val]) || val
