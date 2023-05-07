import { createUv } from '../../../helpers/geomHelpers'

const v033 = 1 / 3
const v066 = v033 * 2


export const tileUv = {
    '0_0': createUv([0, 0], [v033, 0], [v033, v033], [0, v033]),
    '1_0': createUv([v033, 0], [v066, 0], [v066, v033], [v033, v033]),
    '2_0': createUv([v066, 0], [1, 0], [1, v033], [1, v033]),

    '0_1': createUv([0, v033], [v033, v033], [v033, v066], [0, v066]),
    '1_1': createUv([v033, v033], [v066, v033], [v066, v066], [v033, v066]),
    '2_1': createUv([v066, v033], [1, v033], [1, v066], [v066, v066]),

    '0_2': createUv([0, v066], [v033, v066], [v033, 1], [0, 1]),
    '1_2': createUv([v033, v066], [v066, v066], [v066, 1], [v033, 1]),
    '2_2': createUv([v066, v066], [1, v066], [1, 1], [v066, 1]),
}
