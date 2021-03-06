import * as THREE from 'three'


export function createBridgeMesh (material) {
    const geom = new THREE.BoxGeometry(3, 2, 3)
    const mesh = new THREE.Mesh(geom, material)
    mesh.name = 'roomBridge'

    const changeMesh = params => updateMesh(params, mesh)

    return {
        changeMesh,
        mesh,
    }
}



const updateMesh = (data, mesh) => {
    mesh.geometry.dispose()
    mesh.geometry = createGeom(data)
    mesh.geometry.needsUpdate = true

    mesh.position.set(data.x, data.y, data.z)
    mesh.rotation.y = data.rotate + (Math.PI/2 * (1 - data.strengthTwist))
}



const createGeom = data => {
    const pointsPath = createPointsPath(data)
    const pointsCarcass = createPointsCarcass(pointsPath, data)
    return createGeomFromPoints(pointsCarcass)
}



/**
 *         *
 *         |
 *         |
 *         *
 *         |
 *         |
 *         *
 */
function createPointsPath (data) {
    const {
        count,
        twist,
        radius,
        height,
        strengthTwist,
    } = data

    const points = []
    for (let i = 0; i < count; i ++) {
        const phase = i / count

        const d = (radius * 2) * phase * (1 - strengthTwist)
        const twistPoint = twist * phase * strengthTwist

        const x = Math.sin(twistPoint) * radius + d - (radius * (1 - strengthTwist))
        const y = phase * height
        const z = Math.cos(twistPoint) * radius - (radius * (1 - strengthTwist))

        points.push({ x, y, z, twistPoint })
    }
    return points
}



/**
 *           *--------*
 *          /        /
 *         *---*----*
 *             |
 *           *-|-----*
 *          /  |    /
 *         *---*---*
 *             |
 *           *-|------*
 *          /  |    /
 *         *---*---*
 */
function createPointsCarcass (points, data) {
    const h = data['floor']
    const w = data['width']

    const p = []
    for (let i = 0; i < points.length; i ++) {
        const { x, y , z, twistPoint } = points[i]

        const xW = Math.sin(twistPoint) * w
        const zW = Math.cos(twistPoint) * w

        p.push([
            [x + xW, y, z + zW],
            [x + xW, y + h, z + zW],
            [x - xW, y + h, z - zW],
            [x - xW, y, z - zW],
        ])
    }
    return p
}



/**
 *       p[i-2][2]                 p[i-1][2]         p[i][2]
 *            *--------------------*------------ *
 *           /|                  / |            /|
 * p[i-2][1]/ |      p[i-1][1]  /  |   p[i][2] / |
 *         *-------------------*--------------*  |
 *         |  * ---------------|---*----------|-* p[i][3]
 *         | / p[i-2][3]       |  /           | /
 *         |/                  | /            |/
 *         *-------------------*--------------*
 *     p[i-2][0]               p[i-1][0]       p[i][0]
 */
const createGeomFromPoints = data => {
    const points = data
    
    const vertices = [] 
    for (let i = 1; i < points.length - 1; i += 2) {
        vertices.push(

            /** bottom first */
            points[i-1][0][0], points[i-1][0][1], points[i-1][0][2],
            points[i][0][0], points[i][0][1], points[i][0][2],
            points[i][3][0], points[i][3][1], points[i][3][2],

            points[i-1][0][0], points[i-1][0][1], points[i-1][0][2],
            points[i][3][0], points[i][3][1], points[i][3][2],
            points[i-1][3][0], points[i-1][3][1], points[i-1][3][2],

            /** left */

            points[i-1][0][0], points[i-1][0][1], points[i-1][0][2],
            points[i][0][0], points[i][0][1], points[i][0][2],
            points[i][1][0], points[i][1][1], points[i][1][2],

            points[i-1][0][0], points[i-1][0][1], points[i-1][0][2],
            points[i][1][0], points[i][1][1], points[i][1][2],
            points[i-1][1][0], points[i-1][1][1], points[i-1][1][2],


            /** right */

            points[i][3][0], points[i][3][1], points[i][3][2],
            points[i-1][3][0], points[i-1][3][1], points[i-1][3][2],
            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],

            points[i][3][0], points[i][3][1], points[i][3][2],
            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],
            points[i][2][0], points[i][2][1], points[i][2][2],


            /** top */

            points[i-1][1][0], points[i-1][1][1], points[i-1][1][2],
            points[i][1][0], points[i][1][1], points[i][1][2],
            points[i][2][0], points[i][2][1], points[i][2][2],

            points[i-1][1][0], points[i-1][1][1], points[i-1][1][2],
            points[i][2][0], points[i][2][1], points[i][2][2],
            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],


            /** bottom second */

            points[i][0][0], points[i][0][1], points[i][0][2],
            points[i+1][0][0], points[i+1][0][1], points[i+1][0][2],
            points[i+1][3][0], points[i+1][3][1], points[i+1][3][2],

            points[i][0][0], points[i][0][1], points[i][0][2],
            points[i+1][3][0], points[i+1][3][1], points[i+1][3][2],
            points[i][3][0], points[i][3][1], points[i][3][2],


        )
    }    

    const arr = new Float32Array(vertices)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute( 'position', new THREE.BufferAttribute( arr, 3 ) );
    geometry.computeVertexNormals()
    geometry.computeBoundingSphere();

    return geometry
}