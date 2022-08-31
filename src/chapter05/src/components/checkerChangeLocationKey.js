const SIZE = 100

export const createCheckerChangeLocationKey = () => {
    let oldKey = '0_0'

    return {
        checkChanged: (x, z) => {
            const keyX = Math.floor(x / 100)
            const keyZ = Math.floor(z / 100)

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
        }
    }
}