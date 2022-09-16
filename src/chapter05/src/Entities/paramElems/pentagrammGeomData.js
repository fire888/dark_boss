export const boxGeom = (S, H, T, C1, C2) => {
    const FRONT = [
        -S, 0, S,
        S, 0, S,
        -S, T, S,

        -S, T, S,
        S, 0, S,
        S - T, T, S,

        S, 0, S,
        S, H, S,
        S - T, H, S,

        S, 0, S,
        S - T, H, S,
        S - T, T, S,

        /////////////////////
        -S, T, -S + T,
        S - T, T, -S + T,
        S - T, H, -S + T,

        -S, T, -S + T,
        S - T, H, -S + T,
        -S, H, -S + T,
    ]
    const FRONT_COLORS = [
        ...C1,
        ...C1,
        ...C1,

        ...C1,
        ...C1,
        ...C1,

        ...C1,
        ...C1,
        ...C1,

        ...C1,
        ...C1,
        ...C1,

        ...C2,
        ...C2,
        ...C2,

        ...C2,
        ...C2,
        ...C2,
    ]


    const LEFT = [
        -S, 0, -S,
        -S, 0, S,
        -S, T, S,

        -S, 0, -S,
        -S, T, S,
        -S, T, -S + T,

        -S, 0, -S,
        -S, T, -S + T,
        -S, H, -S + T,

        -S, 0, -S,
        -S, H, -S + T,
        -S, H, -S,

        ///////////////////////
        S - T, T, -S + T,
        S - T, T, S,
        S - T, H, S,

        S - T, T, -S + T,
        S - T, H, S,
        S - T, H, -S + T,
    ]

    const TOP = [
        S - T, H, S,
        S, H, S,
        S - T, H, -S + T,

        S, H, S,
        S, H, - S,
        S - T, H, -S + T,

        S, H, -S,
        -S, H, -S,
        S - T, H, -S + T,

        S - T, H, -S + T,
        -S, H, -S,
        -S, H, -S + T,

        //////////////////
        -S, T, S,
        S - T, T, S,
        S - T, T, -S + T,

        -S, T, S,
        S - T, T, -S + T,
        -S, T, -S + T,
    ]

    const RIGHT = [
        S, 0, S,
        S, H, -S,
        S, H, S,

        S, 0, S,
        S, 0, -S,
        S, H, -S,
    ]

    const BACK_ = [
        S, 0, -S,
        -S, 0, -S,
        -S, H, -S,

        S, 0, -S,
        -S, H, -S,
        S, H, -S,
    ]

    const BACK_COLOR = [
        ...C1,
        ...C1,
        ...C1,
        ...C1,
        ...C1,
        ...C1,
    ]



    const vertices = new Float32Array( [
        ...FRONT,
        ...LEFT,
        ...TOP,
        ...RIGHT,
        ...BACK_,
    ]);


    const colors = new Float32Array( [
        ...FRONT_COLORS,
        ...FRONT_COLORS,
        ...FRONT_COLORS,
        ...BACK_COLOR,
        ...BACK_COLOR,
    ])


    return {
        vertices,
        colors,
    }


}