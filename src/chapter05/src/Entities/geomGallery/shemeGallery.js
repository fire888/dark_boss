export const createScheme = () => {
    const arr = []


    // const iterate = (ii) => {
    //     if (ii > 1) {
    //         return;
    //     }


    //     if (ii === 0) {

    //     } else {
    //         const r = Math.random() * 100 * ii + 15
    //         let count = Math.floor(Math.random() * 10) + 5
    //         for (let i = 0; i < count; ++i) {
    //             arr.push({
    //                 id: Math.floor(Math.random() * 1000),
    //                 x: Math.sin(i / count * Math.PI * 2) * r,
    //                 z: Math.cos( i / count * Math.PI * 2) * r,
    //                 angle: (i / count) * (Math.PI * 2),
    //                 h: 0,
    //                 arc: {
    //                     w: r,
    //                 }
    //             })
    //         }
    //     }
    //     iterate(++ii)
    // }


    /** center */
    arr.push({
        id: Math.floor(Math.random() * 1000),
        x: 0,
        z: 0,
        angle: 0,
        h0: 0,
    })


    /** add gallery from center*/
    const iterate = ({
        angle,
        offsetStart,
        h0,
        h2,           
    }) => {
        const d = Math.random() * 50 + 10
        arr.push({
            id: Math.floor(Math.random() * 1000),
            x: Math.sin(angle) * (offsetStart + d),
            z: Math.cos(angle) * (offsetStart + d),
            angle,
            h0,
            h2, 
            arc: { w: d },
        })
        if (Math.random() > .5) {
            iterate({
                angle,
                offsetStart: offsetStart + d,
                h0: 0,
                h2,   
            }) 
        }
    }


    const num = Math.floor(Math.random() * 20) + 3
    const h2 = Math.random() * 30 + 15
    for (let i = 0; i < num; ++i) {
        if (Math.random() > 0.3) {
            iterate({
                angle: (i / num) * (Math.PI * 2),
                offsetStart: 0,
                h0: 0,
                h2,   
            })
        }
    }


    return arr
}