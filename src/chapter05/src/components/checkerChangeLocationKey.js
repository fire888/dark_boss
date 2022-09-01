export const createCheckerChangeLocationKey = (SIZE = 100, x = 0, z = 0) => {
    const keyX = Math.floor(x / SIZE)
    const keyZ = Math.floor(z / SIZE)

    let oldKey = keyX + '_' + keyZ

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
            return {
                oldKey: saveOldKey,
                newKey,
            }
        },
        getCurrent: () => oldKey,
    }
}