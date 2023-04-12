export const makeSetContainsElementsSet1Set2 = (s1, s2) => {
    const result = new Set()
    for (const itemS1 of s1) {
        for (const itemS2 of s2) {
            if (itemS1 === itemS2) {
                result.add(itemS1)
            }
        }
    }
    return result
}


const createRotatedYCopy = matrix => {
    const arr = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
    return arr
}

export const makeRotated360 = tile => {
    const result = [tile]

    /** rotate */
    for (let i = 0; i < 3; ++i) {
        const prev = result[result.length - 1]
        const arr = []
        for (let i = 0; i < prev.length; ++i) {
            const rotated = createRotatedYCopy(prev[i])
            arr.push(rotated)
        }
        result.push(arr)
    }
    return result
}
