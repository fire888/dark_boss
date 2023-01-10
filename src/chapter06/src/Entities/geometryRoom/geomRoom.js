import * as THREE from "three";
const y0 = -70
const y1 = 50

export const createRoom = data => {
    const v = []

    for (let key in data.walls) {
        const {p0, p1, doors} = data.walls[key]

        if (key === 'e') {
            if (doors) {
                doors.sort((a, b) => a.z0 - b.z0)
                for (let i = 0; i < doors.length; ++i) {
                    if (i === 0) {
                        v.push(p0[0] - 1, y0, p0[1] + 1)
                        v.push(p0[0] - 1, y0, doors[i].z0)
                        v.push(p0[0] - 1, y1, doors[i].z0)
                        v.push(p0[0] - 1, y0, p0[1] + 1)
                        v.push(p0[0] - 1, y1, doors[i].z0)
                        v.push(p0[0] - 1, y1, p0[1] + 1)
                    }

                    if (i > 0 && i <= doors.length - 1) {
                        v.push(p0[0] - 1, y0, doors[i - 1].z1)
                        v.push(p0[0] - 1, y0, doors[i].z0)
                        v.push(p0[0] - 1, y1, doors[i].z0)
                        v.push(p0[0] - 1, y0, doors[i - 1].z1)
                        v.push(p0[0] - 1, y1, doors[i].z0)
                        v.push(p0[0] - 1, y1, doors[i - 1].z1)
                    }

                    if (i === doors.length - 1) {
                        v.push(p0[0] - 1, y0, doors[i].z1)
                        v.push(p0[0] - 1, y0, p1[1])
                        v.push(p0[0] - 1, y1, p1[1])
                        v.push(p0[0] - 1, y0, doors[i].z1)
                        v.push(p0[0] - 1, y1, p1[1])
                        v.push(p0[0] - 1, y1, doors[i].z1)
                    }
                }
            } else {
                v.push(p0[0] - 1, y0, p0[1] + 1)
                v.push(p1[0] - 1, y0, p1[1] - 1)
                v.push(p1[0] - 1, y1, p1[1] - 1)
                v.push(p0[0] - 1, y0, p0[1] + 1)
                v.push(p1[0] - 1, y1, p1[1] - 1)
                v.push(p0[0] - 1, y1, p0[1] + 1)
            }
        }

        if (key === 'w') {
            if (doors) {
                doors.sort((a, b) => a.z0 - b.z0)
                for (let i = doors.length - 1; i > - 1; --i) {
                    if (i === doors.length - 1) {
                        v.push(p1[0] + 1, y0, p1[1] - 1)
                        v.push(p1[0] + 1, y0, doors[i].z1)
                        v.push(p1[0] + 1, y1, doors[i].z1)
                        v.push(p1[0] + 1, y0, p1[1] - 1)
                        v.push(p1[0] + 1, y1, doors[i].z1)
                        v.push(p1[0] + 1, y1, p1[1] - 1)
                    }

                    if (i === 0) {
                        v.push(p0[0] + 1, y0, doors[0].z0)
                        v.push(p0[0] + 1, y0, p0[1] + 1)
                        v.push(p0[0] + 1, y1, p0[1] + 1)
                        v.push(p0[0] + 1, y0, doors[0].z0)
                        v.push(p0[0] + 1, y1, p0[1] + 1)
                        v.push(p0[0] + 1, y1, doors[0].z0)
                    }

                    if (i <= doors.length - 1 && i > 0) {
                        v.push(p0[0] + 1, y0, doors[i].z0)
                        v.push(p0[0] + 1, y0, doors[i - 1].z1)
                        v.push(p0[0] + 1, y1, doors[i - 1].z1)
                        v.push(p0[0] + 1, y0, doors[i].z0)
                        v.push(p0[0] + 1, y1, doors[i - 1].z1)
                        v.push(p0[0] + 1, y1, doors[i].z0)
                    }
                }
            } else {
                v.push(p1[0] + 1, y0, p1[1] - 1)
                v.push(p0[0] + 1, y0, p0[1] + 1)
                v.push(p0[0] + 1, y1, p0[1] + 1)
                v.push(p1[0] + 1, y0, p1[1] - 1)
                v.push(p0[0] + 1, y1, p0[1] + 1)
                v.push(p1[0] + 1, y1, p1[1] - 1)
            }
        }

        if (key === 'n') {
            if (doors) {
                doors.sort((a, b) => a.x0 - b.x0)
                for (let i = 0; i < doors.length; ++i) {
                    if (i === 0) {
                        v.push(p0[0] + 1, y0, p0[1] + 1)
                        v.push(doors[0].x0, y0, p0[1] + 1)
                        v.push(doors[0].x0, y1, p0[1] + 1)
                        v.push(p0[0] + 1, y0, p0[1] + 1)
                        v.push(doors[0].x0, y1, p0[1] + 1)
                        v.push(p0[0] + 1, y1, p0[1] + 1)
                    }
                    if (i > 0 && i <= doors.length - 1) {
                        v.push(doors[i - 1].x1, y0, p0[1] + 1)
                        v.push(doors[i].x0, y0, p0[1] + 1)
                        v.push(doors[i].x0, y1, p0[1] + 1)
                        v.push(doors[i - 1].x1, y0, p0[1] + 1)
                        v.push(doors[i].x0, y1, p0[1] + 1)
                        v.push(doors[i - 1].x1, y1, p0[1] + 1)
                    }
                    if (i === doors.length - 1) {
                        v.push(doors[doors.length-1].x1, y0, p0[1] + 1)
                        v.push(p1[0] - 1, y0, p1[1] + 1)
                        v.push(p1[0] - 1, y1, p1[1] + 1)
                        v.push(doors[doors.length-1].x1, y0, p0[1] + 1)
                        v.push(p1[0] - 1, y1, p1[1] + 1)
                        v.push(doors[doors.length-1].x1, y1, p0[1] + 1)
                    }
                }
            } else {
                v.push(p0[0] + 1, y0, p0[1] + 1)
                v.push(p1[0] - 1, y0, p1[1] + 1)
                v.push(p1[0] - 1, y1, p0[1] + 1)
                v.push(p0[0] + 1, y0, p0[1] + 1)
                v.push(p1[0] - 1, y1, p1[1] + 1)
                v.push(p0[0] + 1, y1, p0[1] + 1)
            }
        }

        if (key === 's') {
            if (doors) {
                doors.sort((a, b) => a.x0 - b.x0)
                for (let i = doors.length - 1; i > - 1; --i) {
                    if (i === doors.length - 1) {
                        v.push(p1[0] - 1, y0, p1[1] - 1)
                        v.push(doors[i].x1, y0, p1[1] - 1)
                        v.push(doors[i].x1, y1, p1[1] - 1)
                        v.push(p1[0] - 1, y0, p1[1] - 1)
                        v.push(doors[i].x1, y1, p1[1] - 1)
                        v.push(p1[0] - 1, y1, p1[1] - 1)
                    }
                    if (i <= doors.length - 1 && i > 0) {
                         v.push(doors[i].x0, y0, p1[1] - 1)
                         v.push(doors[i - 1].x1, y0, p1[1] - 1)
                         v.push(doors[i - 1].x1, y1, p1[1] - 1)
                         v.push(doors[i].x0, y0, p1[1] - 1)
                         v.push(doors[i - 1].x1, y1, p1[1] - 1)
                         v.push(doors[i].x0, y1, p1[1] - 1)
                    }
                    if (i === 0) {
                        v.push(doors[i].x0, y0, p0[1] - 1)
                        v.push(p0[0] + 1, y0, p0[1] - 1)
                        v.push(p0[0] + 1, y1, p0[1] - 1)
                        v.push(doors[i].x0, y0, p0[1] - 1)
                        v.push(p0[0] + 1, y1, p0[1] - 1)
                        v.push(doors[i].x0, y1, p0[1] - 1)
                    }
                }
            } else {
                v.push(p1[0] - 1, y0, p1[1] - 1)
                v.push(p0[0] + 1, y0, p0[1] - 1)
                v.push(p0[0] + 1, y1, p0[1] - 1)
                v.push(p1[0] - 1, y0, p1[1] - 1)
                v.push(p0[0] + 1, y1, p0[1] - 1)
                v.push(p1[0] + 1, y1, p1[1] - 1)
            }
        }
    }

    const vertices = new Float32Array(v)
    /** mesh main */
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.computeVertexNormals()
    const mesh = new THREE.Mesh(g, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }))

    return mesh
}