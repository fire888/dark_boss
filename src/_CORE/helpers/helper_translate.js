import { TRANSLATE_WORLDS } from '../../chapter03/constants/constants_replicies'

let currentLanguage = 'en'

// emitter.subscribe('setLanguage')(keyLanguage => {
//     currentLanguage = keyLanguage
// })


export const t = val => (TRANSLATE_WORLDS[currentLanguage] && TRANSLATE_WORLDS[currentLanguage][val]) || val
