let c = 0

export const wall_00_easy = data => {
    const { p0, p1, h0, h1, } = data

    const vM00 = []
    const vM01 = []
    const vM02 = []
    const cM00 = []
    const cM01 = []
    const cM02 = []
    const uM00 = []
    const uM01 = []
    const uM02 = []

    const ind00 = []
    const ind01 = []
    const ind02 = []





    vM00.push(
        c * 35 + 0, 0, 0,
        c * 35 + 30, 0, 0,
        c * 35 + 30, 30, 0,
        c * 35 + 0, 30, 0,
    )
    ind00.push(0, 1, 2, 0, 2, 3)

    vM01.push(
        c * 35 + 0, 30, 0,
        c * 35 + 30, 30, 0,
        c * 35 + 30, 60, 0,
        c * 35 + 0, 60, 0,
    )
    ind01.push(0, 1, 2, 0, 2, 3)


    vM02.push(
        c * 35 + 0, 60, 0,
        c * 35 + 30, 60, 0,
        c * 35 + 30, 90, 0,
        c * 35 + 0, 90, 0,
    )
    ind02.push(0, 1, 2, 0, 2, 3)

    ++c

    return {
        vM00,
        ind00,
        vM01,
        ind01,
        vM02,
        ind02,

        cM00,
        cM01,
        cM02,
        uM00,
        uM01,
        uM02,
    }
}