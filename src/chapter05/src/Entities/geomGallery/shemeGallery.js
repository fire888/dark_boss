export const createScheme = () => {
    const arr = []

    /** add gallery from center*/
    const iterate = ({
        angle,
        offsetStart,
        h0,
        h1,
        h2,
        numFromCenter,
    }) => {
        const d = Math.random() * 120 + 30
        const isAddNext = Math.random() > .5


        arr.push({
            id: Math.floor(Math.random() * 1000),
            x: Math.sin(angle) * (offsetStart + d),
            z: Math.cos(angle) * (offsetStart + d),
            angle,
            h0,
            h1,
            h2, 
            arc: { w: d },
            isTopElem: !isAddNext,
            numFromCenter,
        })
        if (isAddNext) {
            iterate({
                angle,
                offsetStart: offsetStart + d,
                h0,
                h1,
                h2,
                numFromCenter: ++numFromCenter,
            }) 
        }
    }


    const num = Math.floor(Math.random() * 20) + 3
    const h0 = 0
    const h2 = Math.random() * 150 + 30
    const h1 = (Math.random() * .4 + .5)  * h2

    /** center */
    arr.push({
        id: Math.floor(Math.random() * 1000),
        x: 0,
        z: 0,
        angle: 0,
        h0,
        h1,
        h2,
        numFromCenter: 0,
        isTopElem: false,
        isColumn: true,
    })



    for (let i = 0; i < num; ++i) {
        if (Math.random() > 0.3) {
            iterate({
                angle: (i / num) * (Math.PI * 2),
                offsetStart: 0,
                h0,
                h1,
                h2,
                numFromCenter: 1,
            })
        }
    }


    let savedL = arr.length
    for (let i = 0; i < 3; ++i) {
        const _h0 = arr[arr.length - 1].h2
        const _h2 = _h0 + Math.random() * 150 + 30
        const _h1 = _h0 + (Math.random() * .4 + .5) * (_h2 - _h0)
        for (let j = 0; j < savedL; ++j) {
            if (!arr[j].isTopElem) {
                arr.push({
                    ...arr[j],
                    h0: _h0,
                    h1: _h1,
                    h2: _h2,
                    isTopElem: i === 2,
                    //isColumn: arr[j].isColumn
                })
            }
        }
    }
    return arr
}