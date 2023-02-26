import * as THREE from 'three'

export const createParticles = (root) => {
    const MAX_ALPHA = 1
    const MIN_SPD_ALPHA = .0025
    const MAX_SPD_RND_ALPHA =  0.005

    const MAX_SPD = 0.05
    const MAX_SPD_HALF = MAX_SPD / 2


    const material = new THREE.PointsMaterial( {
        fog: false,
        size: 35,
        color: 0x000000,
        alphaTest: 0.,
        map: root.assets.flareSrc,
        //blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
        alphaMap: root.assets.flareSrc,
        vertexColors: true,
        side: THREE.DoubleSide,
    } );
    

    const centerPoint = [0, -25, -0]
    const pointsData = []

    const
        W = 3000,
        H = 25,
        Z = 3000,
        N = 1000

    const resetSingleData = () => {
        const userData = {
            spdX: Math.random() * MAX_SPD - MAX_SPD_HALF,
            spdY: Math.random() * MAX_SPD - MAX_SPD_HALF,
            spdZ: Math.random() * MAX_SPD - MAX_SPD_HALF,
            spdAlpha: Math.random() * MAX_SPD_RND_ALPHA + MIN_SPD_ALPHA,
            isMustStartHide: false,
            countIterations: Math.floor(Math.random() * 3 + 1)
        }
        return userData
    }

    const vertices = []
    const colors = []
    for ( let i = 0; i < N; i ++ ) {
        const x = Math.random() * (W) + centerPoint[0]
        const y = Math.random() * (H) + centerPoint[1]
        const z = Math.random() * (Z) + 200 + centerPoint[2]
        vertices.push( x, y, z )

        colors.push(0, 0, 0, 1)

        pointsData.push({
            index: i,
            ...resetSingleData()
        })
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4))
    const particles = new THREE.Points(geometry, material)


    const update = () => {
        for (let i = 0; i < pointsData.length; ++i) {
            const data = pointsData[i]
            geometry.attributes.position.array[i * 3] += data.spdX
            geometry.attributes.position.array[i * 3 + 1] += data.spdY
            geometry.attributes.position.array[i * 3 + 2] += data.spdZ


            if (!data.isMustStartHide) {
                geometry.attributes.color.array[i * 4 + 3] += data.spdAlpha

                if (geometry.attributes.color.array[i * 4 + 3] > MAX_ALPHA) {
                    data.isMustStartHide = true
                }
            }

            if (data.isMustStartHide) {
                geometry.attributes.color.array[i * 4 + 3] -= data.spdAlpha

                if (geometry.attributes.color.array[i * 4 + 3] <= 0) {
                    data.isMustStartHide = false
                    data.countIterations--
                    if (data.countIterations === 0) {
                        Object.assign(data, resetSingleData())
                        geometry.attributes.position.array[i * 3] = Math.random() * (W) //- (W / 2) + centerPoint[0]
                        geometry.attributes.position.array[i * 3 + 1] = Math.random() * (H) - (H / 2) + centerPoint[1]
                        geometry.attributes.position.array[i * 3 + 2] = Math.random() * (Z) + 200 //- (Z / 2) + centerPoint[2]
                    }
                }
            }

            geometry.attributes.position.needsUpdate = true
            geometry.attributes.color.needsUpdate = true
        }
    }


   return {
       m: particles, 
       stop: () => {
          // isUpdate = false
       },
       start: () => {
          // isUpdate = true
       },
       setCenterPos: (x, y, z) => {
           //centerPoint[0] = x
           //centerPoint[1] = y
           //centerPoint[2] = z
       },
       update,
   }
}