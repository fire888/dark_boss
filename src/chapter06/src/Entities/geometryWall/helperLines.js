import * as THREE from 'three'

const materialB = new THREE.LineBasicMaterial({
    color: 0x0000ff
});
const materialG = new THREE.LineBasicMaterial({
    color: 0x00ff00
});
const materialR = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const materialY = new THREE.LineBasicMaterial({
    color: 0x00FFFF
});
const materialW = new THREE.LineBasicMaterial({
    color: 0xFFFFFF
});


export const  createHelperLines = (data) => {
    const { node, nodeE, nodeN, nodeW, nodeS } = data

    const m = new THREE.Object3D()

    //console.log(data)
    {
        const p = [
            nodeN.center.x, 0, nodeN.center.z,
            node.center.x, 0, node.center.z,
        ]
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

        const line = new THREE.Line(geometry, materialR);
        m.add(line)
    }

    /// top L
    {
        const p = [
            nodeN.left.x, 0, nodeN.left.z,
            node.topLeft.x, 0, node.topLeft.z,
        ]
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

        const line = new THREE.Line(geometry, materialW);
        m.add(line)
    }
    /// top R
    {
        const p = [
            nodeN.right.x, 0, nodeN.right.z,
            node.topRight.x, 0, node.topRight.z,
        ]
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

        const line = new THREE.Line(geometry, materialW);
        m.add(line)
    }


    // west center
    {
        const p = [
            nodeW.center.x, 0, nodeW.center.z,
            node.center.x, 0, node.center.z,
        ]
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

        const line = new THREE.Line(geometry, materialG);
        m.add(line)
    }

    // west top
    {
        const p = [
            nodeW.top.x, 0, nodeW.top.z,
            node.topLeft.x, 0, node.topLeft.z,
        ]
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

        const line = new THREE.Line(geometry, materialW);
        m.add(line)
    }

    // west bottom
    {
        const p = [
            nodeW.bottom.x, 0, nodeW.bottom.z,
            node.bottomLeft.x, 0, node.bottomLeft.z,
        ]
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

        const line = new THREE.Line(geometry, materialW);
        m.add(line)
    }




    if (nodeE) {
        {
            const p = [
                nodeE.center.x, 0, nodeE.center.z,
                node.center.x, 0, node.center.z,
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

            const line = new THREE.Line(geometry, materialY);
            m.add(line)
        }

        {
            const p = [
                nodeE.top.x, 0, nodeE.top.z,
                node.topRight.x, 0, node.topRight.z,
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

            const line = new THREE.Line(geometry, materialW);
            m.add(line)
        }

        {
            const p = [
                nodeE.bottom.x, 0, nodeE.bottom.z,
                node.bottomRight.x, 0, node.bottomRight.z,
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

            const line = new THREE.Line(geometry, materialW);
            m.add(line)
        }



    }

    if (nodeS) {
        {
            const p = [
                nodeS.center.x, 0, nodeS.center.z,
                node.center.x, 0, node.center.z,
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

            const line = new THREE.Line(geometry, materialB);
            m.add(line)
        }

        {
            const p = [
                nodeS.left.x, 0, nodeS.left.z,
                node.bottomLeft.x, 0, node.bottomLeft.z,
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

            const line = new THREE.Line(geometry, materialW);
            m.add(line)
        }

        {
            const p = [
                nodeS.right.x, 0, nodeS.right.z,
                node.bottomRight.x, 0, node.bottomRight.z,
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))

            const line = new THREE.Line(geometry, materialW);
            m.add(line)
        }
    }



    //scene.add( line );
    return m;
}