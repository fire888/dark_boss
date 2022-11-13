export const createSchemeTown = () => {
    const w = 250
    const numsX = 5
    const numsZ = 5


    /** centers with node */
    const arr = []
    for (let i = 0; i < numsX; ++i) {
        for (let j = 0; j < numsZ; ++j) {
            const x = i * w + w / 2 - (w * numsX * .5)
            const z = j * w + w / 2 - (numsZ * w)

            const node = {
                x: x + Math.random() * w * 0.5 * Math.sign(Math.random() -.5),
                z: z + Math.random() * w * 0.5 * Math.sign(Math.random() -.5),
            }

            arr.push({
                x, z, w, i, j, node, id: '' + i + '_' + j
            })
        }
    }


    /** connectors */
    for (let i = 0; i < arr.length; ++i) {
        const { x, z, id } = arr[i]
        const nodeN = {
            x: x + Math.random() * w * 0.5 * Math.sign(Math.random() -.5),
            z: z - (w / 2),
        }
        const nodeW = {
            x: x - (w / 2),
            z: z + Math.random() * w * 0.5 * Math.sign(Math.random() -.5),
        }
        arr[i].nodeN = nodeN
        arr[i].nodeW = nodeW
        for (let j = 0; j < arr.length; ++j) {
            if (
                arr[i].i === arr[j].i &&
                arr[i].j === arr[j].j + 1
            ) {
                arr[j].nodeS = { ...nodeN }
            }
            if (
                arr[i].i === arr[j].i + 1 &&
                arr[i].j === arr[j].j
            ) {
                arr[j].nodeE = { ...nodeW }
            }
        }
    }


    const walls = []


    return arr;
}