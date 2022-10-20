export const createCheckerChangeLocationKey = (SIZE = 100, x = 0, z = 0) => {
    const keyX = Math.floor(x / SIZE)
    const keyZ = Math.floor(z / SIZE)

    let oldKey = keyX + '_' + keyZ


    let currentEnv = generateEnvByQ(keyX, keyZ)

    return {
        checkChanged: (x, z) => {
            const keyX = Math.floor(x / SIZE)
            const keyZ = Math.floor(z / SIZE)

            const newKey = keyX + '_' + keyZ
            if (newKey === oldKey) {
                return false;
            }

            const saveOldKey = oldKey
            oldKey = newKey


            const oldEnv = currentEnv
            currentEnv = generateEnvByQ(keyX, keyZ)

            const addedQs = getArrNotInFirst(currentEnv, oldEnv)
            const removedQs = getArrNotInFirst(oldEnv, currentEnv)

            return {
                oldKey: saveOldKey,
                newKey,
                newEnv: currentEnv,
                removedQs,
                addedQs,
            }
        },
        getCurrent: () => ({
            loc: oldKey,
            currentEnv,
        }),
    }
}


const generateEnvByQ = (qX, qZ) => {
    const arr = []
    for (let i = qX - 1; i < qX + 2; ++i) {
        for (let j = qZ - 1; j < qZ + 2; ++j) {
            arr.push(i + '_' + j)
        }
    }
    return arr
}

const getArrNotInFirst = (arr1, arr2) => {
    const arr = []
    for (let i = 0; i < arr1.length; ++i) {
        let isIn = false
        for (let j = 0; j < arr2.length; ++j) {
            if (arr1[i] === arr2[j]) {
                isIn = true
            }
        }
        if (!isIn) {
            arr.push(arr1[i])
        }
    }
    return arr
}