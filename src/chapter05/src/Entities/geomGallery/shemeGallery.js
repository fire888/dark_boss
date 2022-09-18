export const createScheme = () => {
    const arr = []


    const iterate = (ii) => {
        if (ii > 1) {
            return;
        }


        if (ii === 0) {
            arr.push({
                id: Math.floor(Math.random() * 1000),
                x: 0,
                z: 0,
                angle: 0,
                h: 0,
            })
        } else {
            const r = Math.random() * 100 * ii
            let count = Math.floor(Math.random() * 5) + 5
            for (let i = 0; i < count; ++i) {
                arr.push({
                    id: Math.floor(Math.random() * 1000),
                    x: Math.sin(i / count * Math.PI * 2) * r,
                    z: Math.cos( i / count * Math.PI * 2) * r,
                    angle: (i / count) * (Math.PI * 2),
                    h: 0,
                })
            }
        }
        iterate(++ii)
    }

    iterate(0)

    return arr
}