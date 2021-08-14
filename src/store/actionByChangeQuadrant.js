import { S, H } from '../constants/constants_elements'



export const START_LAYER_STATE = 'outer'





export const CHANGE_LAYER_STATE = [
    /** ********************************************************/
    {
        oldState: 'outer', newState: 'corridor',
        oldQuadrant: [0, -2, 4], newQuadrant: [0, -2, 3],
        emitData: [
            {
                emitKey: 'CHANGE_ENVIRONMENT',
                environmentMode: 'corridorLight',
                backgroundImg: false
            },
        ],
    },
    {
        oldState: 'corridor', newState: 'outer',
        oldQuadrant: [0, -2, 3], newQuadrant: [0, -2, 4],
        emitData: [
            {
                emitKey: 'CHANGE_ENVIRONMENT',
                environmentMode: 'outer',
            },
        ]
    },

    /** ********************************************************/
    {
        oldState: 'corridor', newState: 'firstRoom',
        oldQuadrant: [0, -1, 2], newQuadrant: [0, -1, 1],
        emitData: [
            {
                emitKey: 'CHANGE_ENVIRONMENT',
                environmentMode: 'firstRoomLight',
            }
        ],
    },
    {
        oldState: 'firstRoom', newState: 'corridor',
        oldQuadrant: [0, -1, 1], newQuadrant: [0, -1, 2],
        emitData: [
            {
                emitKey: 'CHANGE_ENVIRONMENT',
                environmentMode: 'corridorLight',
            },
        ],
    },

    /** ********************************************************/

    {
        oldState: 'firstRoom', newState: 'playLevel',
        oldQuadrant: [0, -1, 0], newQuadrant: [0, -1, 'ANY_MINUS_ONE'],
        emitData: [
            {
                emitKey: 'DESTROY_START_CORRIDOR'
            },
            {
                emitKey: 'CHANGE_QUADRANT'
            },
        ],
    },
    {
        oldState: 'firstRoom', newState: 'playLevel',
        oldQuadrant: [0, -1, 0], newQuadrant: ['ANY_MINUS_ONE', -1, 0],
        emitData: [
            {
                emitKey: 'DESTROY_START_CORRIDOR'
            },
            {
                emitKey: 'CHANGE_QUADRANT'
            },
        ],
    },
    {
        oldState: 'firstRoom', newState: 'playLevel',
        oldQuadrant: [0, -1, 0], newQuadrant: ['ANY_PLUS_ONE', -1, 0],
        emitData: [
            {
                emitKey: 'DESTROY_START_CORRIDOR'
            },
            {
                emitKey: 'CHANGE_QUADRANT'
            },
        ],
    },

    /** ********************************************************/

    {
        oldState: 'playLevel', newState: 'playLevel',
        oldQuadrant: ['ANY', 'ANY', 'ANY'], newQuadrant: ['ANY', 'ANY_PLUS_ONE', 'ANY'],
        emitData: [
            {
                emitKey: 'CHANGE_ENVIRONMENT',
                environmentMode: 'default',
            },
            {
                emitKey: 'CHANGE_QUADRANT',
                counter: () => 0,
            },
        ],
    },


    {
        oldState: 'playLevel', newState: 'playLevel',
        oldQuadrant: ['ANY', 'ANY', 'ANY'], newQuadrant: ['ANY', 'ANY_MINUS_ONE', 'ANY'],
        emitData: [
            {
                emitKey: 'CHANGE_ENVIRONMENT',
                environmentMode: 'default',
            },
            {
                emitKey: 'CHANGE_QUADRANT',
                counter: () => 100,
            },
        ],
    },


    /** ********************************************************/

    {
        oldState: 'playLevel', newState: 'playLevel',
        oldQuadrant: ['ANY', 'ANY', 'ANY'], newQuadrant: ['ANY', 'ANY', 'ANY_MINUS_ONE'],
        emitData: [
            {
                emitKey: 'CHANGE_QUADRANT',
                counter: val => ++val,
            },
        ],
    },

    {
        oldState: 'playLevel', newState: 'playLevel',
        oldQuadrant: ['ANY', 'ANY', 'ANY'], newQuadrant: ['ANY_MINUS_ONE', 'ANY', 'ANY'],
        emitData: [
            {
                emitKey: 'CHANGE_QUADRANT',
                counter: val => ++val,
            }
        ],
    },

    {
        oldState: 'playLevel', newState: 'playLevel',
        oldQuadrant: ['ANY', 'ANY', 'ANY'], newQuadrant: ['ANY_PLUS_ONE', 'ANY', 'ANY'],
        emitData: [
            {
                emitKey: 'CHANGE_QUADRANT',
                counter: val => ++val,
            }
        ],
    },

    {
        oldState: 'playLevel', newState: 'playLevel',
        oldQuadrant: ['ANY', 'ANY', 'ANY'], newQuadrant: ['ANY', 'ANY', 'ANY_PLUS_ONE'],
        emitData: [
            {
                emitKey: 'CHANGE_QUADRANT',
                counter: val => ++val,
            }
        ],
    },
]



export class ChangerQuadrant {
    constructor(gameContext) {
        const { pr, emitter } = gameContext
        const checkerNewQuadrant = createCheckerNewQuadrant()


        emitter.subscribe('playerMove')(({ pos }) => {
            const data = checkerNewQuadrant.update(pos)
            const { currentQuadrant, oldQuadrant, isChanged } = data

            if (!isChanged) return;

            const arrEmitData = getEmitsByChangeQuadrant(oldQuadrant, currentQuadrant)

            arrEmitData.length && arrEmitData.forEach(item => pr.dispatch({
                ...item,
                type: item.emitKey,
            }))
        })
    }
}




let levelState = START_LAYER_STATE


export const getEmitsByChangeQuadrant = (playerOldQ, playerNewQ) => {
    for (let i = 0; i < CHANGE_LAYER_STATE.length; ++i) {
        const data = getData(
            [...playerOldQ],
            [...playerNewQ],
            {
                ...CHANGE_LAYER_STATE[i],
                oldQuadrant: [...CHANGE_LAYER_STATE[i].oldQuadrant],
                newQuadrant: [...CHANGE_LAYER_STATE[i].newQuadrant],
            }
        )
        if (data) return data;
    }
    return { levelState }
}




const getData = (playerOldQ, playerNewQ, conf) => {
    const { oldState, newState, oldQuadrant, newQuadrant, emitData } = conf

    if (levelState !== oldState)
        return;


    if (oldQuadrant[0] === 'ANY') oldQuadrant[0] = playerOldQ[0]
    if (oldQuadrant[1] === 'ANY') oldQuadrant[1] = playerOldQ[1]
    if (oldQuadrant[2] === 'ANY') oldQuadrant[2] = playerOldQ[2]

    if (newQuadrant[0] === 'ANY') newQuadrant[0] = playerNewQ[0]
    if (newQuadrant[1] === 'ANY') newQuadrant[1] = playerNewQ[1]
    if (newQuadrant[2] === 'ANY') newQuadrant[2] = playerNewQ[2]

    if (newQuadrant[0] === 'ANY_PLUS_ONE') newQuadrant[0] = playerOldQ[0] + 1
    if (newQuadrant[1] === 'ANY_PLUS_ONE') newQuadrant[1] = playerOldQ[1] + 1
    if (newQuadrant[2] === 'ANY_PLUS_ONE') newQuadrant[2] = playerOldQ[2] + 1

    if (newQuadrant[0] === 'ANY_MINUS_ONE') newQuadrant[0] = playerOldQ[0] - 1
    if (newQuadrant[1] === 'ANY_MINUS_ONE') newQuadrant[1] = playerOldQ[1] - 1
    if (newQuadrant[2] === 'ANY_MINUS_ONE') newQuadrant[2] = playerOldQ[2] - 1


    if (
        oldQuadrant[0] !== playerOldQ[0] ||
        oldQuadrant[1] !== playerOldQ[1] ||
        oldQuadrant[2] !== playerOldQ[2] ||
        newQuadrant[0] !== playerNewQ[0] ||
        newQuadrant[1] !== playerNewQ[1] ||
        newQuadrant[2] !== playerNewQ[2]
    ) return;


    levelState = newState

    return emitData.map(item => ({
        ...item,
        levelState,
        oldQuadrant: [...oldQuadrant],
        newQuadrant: [...newQuadrant],
    }))
}





const createCheckerNewQuadrant = function () {
    let oldQuadrant = []

    return {
        update ({ x, y, z}) {
            const currentQuadrant = [Math.floor(x / S), Math.floor(y / H), Math.floor(z / S)]

            if (
                currentQuadrant[0] !== oldQuadrant[0] ||
                currentQuadrant[1] !== oldQuadrant[1] ||
                currentQuadrant[2] !== oldQuadrant[2]
            ) {
                const data = {
                    isChanged: true,
                    currentQuadrant,
                    oldQuadrant,
                }
                oldQuadrant = [...currentQuadrant]

                return data
            } else {
                return { isChanged: false }
            }
        },
    }
}




