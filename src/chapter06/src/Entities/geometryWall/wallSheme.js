const ranMM = (min, max) => Math.random() * (max - min) + min
const ran = v => Math.random() * v 

export const createWallScheme = data => {
    const {
        w = 300,
        h = 100,
        countTrash = 6
    } = data

    const step = w / countTrash


    const arr = []
    for (let i = 0; i < w / step; ++i) {
        const a = []
        for (let j = 0; j < h / step; ++j) {
            a.push({ 
                i,
                j,
                x: Math.random() * step + (i * step),
                y: Math.random() * step + (j * step),
                nears: [],
            })
        }
        arr.push(a)
    }



    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr[i].length; ++j) {
            if (arr[i - 1] && arr[i - 1][j]) {
                if (i % 2 !== 0) {
                    arr[i][j].nears.push({ i: i - 1, j })
                } else {
                    if (j === 0 || j == arr[i].length - 1) {
                        arr[i][j].nears.push({ i: i - 1, j })
                    }
                }
            }
            if (arr[i] && arr[i][j - 1]) {
                arr[i][j].nears.push({ i, j: j - 1 })
            }
        }
    }

    //console.log(arr)

    return arr
}