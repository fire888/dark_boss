import { createSchemePath } from "./schemes/schemePath";
import * as THREE from "three";
import { createDataGeomPath } from './geometryWall/dataGeomPath'

export const createMeshPath = (root) => {
    const v = []
    const c = []
    const u2 = []




    const schemePath = createSchemePath()


     /** lines */
     const materialR = new THREE.LineBasicMaterial({ color: 0xff0000 })
     const materialG = new THREE.LineBasicMaterial({ color: 0x00ff00 })
     const materialY = new THREE.LineBasicMaterial({ color: 0xFFff00 })
     for (let i = 1; i < schemePath.length; ++i) {
         const { axisData, leftData, rightData, res } = schemePath[i]
         {
             const p = [...axisData.p0.toArray(), ...axisData.p1.toArray()]
             const geometry = new THREE.BufferGeometry()
             geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
             const line = new THREE.Line(geometry, materialR);
             //const dataSegment = createHelperLines(schemeTown[i])
             root.studio.addToScene(line)
         }


         {
             const p = [...axisData.p1.toArray(), ...res.toArray()]
             const geometry = new THREE.BufferGeometry()
             geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
             const line = new THREE.Line(geometry, materialY);
             //const dataSegment = createHelperLines(schemeTown[i])
             root.studio.addToScene(line)
         }




         {
             const p = [...leftData.p0.toArray(), ...leftData.p1.toArray()]
             const geometry = new THREE.BufferGeometry()
             geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
             const line = new THREE.Line(geometry, materialG);
             //const dataSegment = createHelperLines(schemeTown[i])
             root.studio.addToScene(line)
         }

         {
             const p = [...rightData.p0.toArray(), ...rightData.p1.toArray()]
             const geometry = new THREE.BufferGeometry()
             geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
             const line = new THREE.Line(geometry, materialG);
             //const dataSegment = createHelperLines(schemeTown[i])
             root.studio.addToScene(line)
         }




    }


    for (let i = 0; i < schemePath.length; ++i) {
         const dataSegment = createDataGeomPath(schemePath[i])
         v.push(...dataSegment.v)
         c.push(...dataSegment.c)
    }


    const vertices = new Float32Array(v)
    const colors =  new Float32Array(c)
    //const uv2 = new Float32Array(u2)

    /** mesh main */
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    // //g.setAttribute('uv2', new THREE.BufferAttribute(uv2, 2))
    g.computeVertexNormals()
    const wallMat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(g, wallMat)



    return { mesh }
}