const ranMM = (min, max) => Math.random() * (max - min) + min
const ran = v => Math.random() * v 

export const createWallScheme = data => {
    const dataWall = []
    const fullWidth = 2000
    let x = 0
    let w = null
    let wNext = Math.random() * 70 + 10

    while (x < fullWidth) {
        const wc = 2.5
        w = wNext
        wNext = Math.random() * 80 + 10
        dataWall.push({
            x,
            w,
            wc,
            innerH: w + Math.random() * 160,
            h: 250,
            isWindow: Math.random() < .7,
        })
        x += (w / 2 + wNext / 2 + wc + wc)
    }

    return dataWall
}