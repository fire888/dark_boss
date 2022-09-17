import { m4 } from '../../helpers/m4'


const createColumn = ({
        // resolution = 4,
        rBase = 5,
        hBase = 5,
        hBaseToTrunk = 1,
        hCapital = 2,
        hTrunkToCapital = 1,
        hTrunk = 30,
        rTrunk = 3,
        dividersCountTrunk = 3,
        hDividersTrunk = 1,
        hTrunkToDividers = .5,
        color1 = [0, 0, 1],
        color2 = [0, 1, 1],
    }) => {

    /** base **************/
    const base = [
        -rBase, 0, rBase,
        rBase, 0, rBase,
        rBase, hBase, rBase,

        -rBase, 0, rBase,
        rBase, hBase, rBase,
        -rBase, hBase, rBase,
    ]
    const colorBase = [
        ...color1, ...color1, ...color1,
        ...color1, ...color1, ...color1,
    ]


    /** main ************/
    const vertices = [
        ...base
    ]
    const colors = [
        ...colorBase
    ]

    return {
        vertices,
        colors,
    }
}

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


    let matrix = m4.xRotation(0);
    matrix = m4.translate(matrix, 0, 5, 0);

    for (var ii = 0; ii < TOP.length; ii += 3) {
        var vector = m4.transformPoint(matrix, [TOP[ii + 0], TOP[ii + 1], TOP[ii + 2], 1]);
        TOP[ii + 0] = vector[0];
        TOP[ii + 1] = vector[1];
        TOP[ii + 2] = vector[2];
    }

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


/**

 // Fill the buffer with the values that define a letter 'F'.
 function setGeometry(gl) {
  var positions = new Float32Array([
          // left column front
          0,   0,  0,
          0, 150,  0,
          30,   0,  0,
          0, 150,  0,
          30, 150,  0,
          30,   0,  0,

          // top rung front
          30,   0,  0,
          30,  30,  0,
          100,   0,  0,
          30,  30,  0,
          100,  30,  0,
          100,   0,  0,

          // middle rung front
          30,  60,  0,
          30,  90,  0,
          67,  60,  0,
          30,  90,  0,
          67,  90,  0,
          67,  60,  0,

          // left column back
            0,   0,  30,
           30,   0,  30,
            0, 150,  30,
            0, 150,  30,
           30,   0,  30,
           30, 150,  30,

          // top rung back
           30,   0,  30,
          100,   0,  30,
           30,  30,  30,
           30,  30,  30,
          100,   0,  30,
          100,  30,  30,

          // middle rung back
           30,  60,  30,
           67,  60,  30,
           30,  90,  30,
           30,  90,  30,
           67,  60,  30,
           67,  90,  30,

          // top
            0,   0,   0,
          100,   0,   0,
          100,   0,  30,
            0,   0,   0,
          100,   0,  30,
            0,   0,  30,

          // top rung right
          100,   0,   0,
          100,  30,   0,
          100,  30,  30,
          100,   0,   0,
          100,  30,  30,
          100,   0,  30,

          // under top rung
          30,   30,   0,
          30,   30,  30,
          100,  30,  30,
          30,   30,   0,
          100,  30,  30,
          100,  30,   0,

          // between top rung and middle
          30,   30,   0,
          30,   60,  30,
          30,   30,  30,
          30,   30,   0,
          30,   60,   0,
          30,   60,  30,

          // top of middle rung
          30,   60,   0,
          67,   60,  30,
          30,   60,  30,
          30,   60,   0,
          67,   60,   0,
          67,   60,  30,

          // right of middle rung
          67,   60,   0,
          67,   90,  30,
          67,   60,  30,
          67,   60,   0,
          67,   90,   0,
          67,   90,  30,

          // bottom of middle rung.
          30,   90,   0,
          30,   90,  30,
          67,   90,  30,
          30,   90,   0,
          67,   90,  30,
          67,   90,   0,

          // right of bottom
          30,   90,   0,
          30,  150,  30,
          30,   90,  30,
          30,   90,   0,
          30,  150,   0,
          30,  150,  30,

          // bottom
          0,   150,   0,
          0,   150,  30,
          30,  150,  30,
          0,   150,   0,
          30,  150,  30,
          30,  150,   0,

          // left side
          0,   0,   0,
          0,   0,  30,
          0, 150,  30,
          0,   0,   0,
          0, 150,  30,
          0, 150,   0]);

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  var matrix = m4.xRotation(Math.PI);
  matrix = m4.translate(matrix, -50, -75, -15);

  for (var ii = 0; ii < positions.length; ii += 3) {
    var vector = m4.transformPoint(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1]);
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}
 */