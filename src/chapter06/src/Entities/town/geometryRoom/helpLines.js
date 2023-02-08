import * as THREE from "three";

export const createHelpLines = (resultArr) => {
    /** lines */
    const mesh = new THREE.Group()
    for (let i = 0; i < resultArr.length; ++i) {
        const materialW = new THREE.LineBasicMaterial({
            color: Math.random() * 0xFFFFFF
        })
        for (let key in resultArr[i].walls) {
            const {p0, p1, doors} = resultArr[i].walls[key]
            const y = -50
            const p = [p0[0], y, p0[1], p1[0], y, p1[1]]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
            const line = new THREE.Line(geometry, materialW);
            mesh.add(line)

            if (doors) {
                if (key === 'n') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            doors[i]['x0'], y, p0[1],
                            doors[i]['x0'], y, p0[1] + 5,
                            doors[i]['x1'], y, p0[1] + 5,
                            doors[i]['x1'], y, p0[1],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
                if (key === 's') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            doors[i]['x0'], y, p0[1],
                            doors[i]['x0'], y, p0[1] - 5,
                            doors[i]['x1'], y, p0[1] - 5,
                            doors[i]['x1'], y, p0[1],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
                if (key === 'e') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            p0[0], y, doors[i]['z0'],
                            p0[0] - 5, y, doors[i]['z0'],
                            p0[0] - 5, y, doors[i]['z1'],
                            p0[0], y, doors[i]['z1'],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
                if (key === 'w') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            p0[0], y, doors[i]['z0'],
                            p0[0] + 5, y, doors[i]['z0'],
                            p0[0] + 5, y, doors[i]['z1'],
                            p0[0], y, doors[i]['z1'],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
            }
        }
    }

    return mesh
}