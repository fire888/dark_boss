import * as THREE from 'three'

export const createParticles = (root) => {
    const material = new THREE.PointsMaterial( { 
        size: 5, 
        map: root.assets.flareSrc, 
        //blending: THREE.AdditiveBlending, 
        depthTest: false, 
        transparent: true,
        alphaMap: root.assets.flareSrc,
    } );
    material.color.setHSL(1, 1, 1)
    
    const
    W = 100,
    H = 20,
    Z = 50,
    N = 15


    const data = []
    const centerPoint = [0, 0, 0]
    const resetSingleParticle = p => {
        p.color.a = 0
        p.userData = {
            spdX: Math.random() * MAX_SPD - MAX_SPD_HALF,
            spdY: Math.random() * MAX_SPD - MAX_SPD_HALF,
            spdZ: Math.random() * MAX_SPD - MAX_SPD_HALF,
            spdAlpha: Math.random() * MAX_SPD_RND_ALPHA + MIN_SPD_ALPHA,
            isMustStartHide: false,
            countIterations: Math.floor(Math.random() * 3 + 1)
        }
        p.position.x = Math.random() * W - W / 2 + centerPoint[0]
        p.position.y = Math.random() * H - H / 2 + centerPoint[1]
        p.position.z = Math.random() * Z - Z / 2 + centerPoint[2]
    }




    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for ( let i = 0; i < 100; i ++ ) {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 300 - 150 - 45;
        const z = Math.random() * 300 - 150;
        vertices.push( x, y, z );
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    const particles = new THREE.Points(geometry, material);

    //scene.add( particles );

//    const MAX_ALPHA = .45
//    const MIN_SPD_ALPHA = .0025
//    const MAX_SPD_RND_ALPHA =  0.005

//    const MAX_SPD = 0.015
//    const MAX_SPD_HALF = MAX_SPD / 2

//    const centerPoint = [0, 0, 0]

//    const particleSystem = new BABYLON.ParticleSystem("particles", N, scene)
//    particleSystem.particleTexture = new BABYLON.Texture(textureSrc, scene)
//    particleSystem.blendMode = BABYLON.BaseParticleSystem.BLENDMODE_ADD
//    particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.7, 0)
//    particleSystem.emitRate = 1000

//    /** don't pure ..  ********************************/
//    const resetSingleParticle = p => {
//        p.color.a = 0
//        p.userData = {
//            spdX: Math.random() * MAX_SPD - MAX_SPD_HALF,
//            spdY: Math.random() * MAX_SPD - MAX_SPD_HALF,
//            spdZ: Math.random() * MAX_SPD - MAX_SPD_HALF,
//            spdAlpha: Math.random() * MAX_SPD_RND_ALPHA + MIN_SPD_ALPHA,
//            isMustStartHide: false,
//            countIterations: Math.floor(Math.random() * 3 + 1)
//        }
//        p.position.x = Math.random() * W - W / 2 + centerPoint[0]
//        p.position.y = Math.random() * H - H / 2 + centerPoint[1]
//        p.position.z = Math.random() * Z - Z / 2 + centerPoint[2]
//    }


//    let isUpdate = true
//    particleSystem.updateFunction = ps => {
//        if (!isUpdate) {
//            return
//        }

//        /** don't create new particles, use only exists */
//        if (ps.length > N) {
//            particleSystem.emitRate = 0
//        }

//        for (let i = 0; i < ps.length; ++i) {
//            /** start init particle data ***************/
//            if (!ps[i].userData) {
//                resetSingleParticle(ps[i])
//            }

//            /** update position ************************/
//            ps[i].position.x += ps[i].userData.spdX
//            ps[i].position.y += ps[i].userData.spdY
//            ps[i].position.z += ps[i].userData.spdZ

//            /** update alpha and reset if life complete */
//            if (!ps[i].userData.isMustStartHide) {
//                ps[i].color.a += ps[i].userData.spdAlpha
//                if (ps[i].color.a > MAX_ALPHA) {
//                    ps[i].userData.isMustStartHide = true
//                }
//            }

//            if (ps[i].userData.isMustStartHide) {
//                ps[i].color.a -= ps[i].userData.spdAlpha

//                if (ps[i].color.a <= 0) {
//                    ps[i].userData.countIterations -= 1

//                    if (ps[i].userData.countIterations > 0) {
//                        ps[i].userData.isMustStartHide = false
//                    } else {
//                        resetSingleParticle(ps[i])
//                    }
//                }
//            }
//        }
//    }

//    particleSystem.start()




   return {
       m: particles, 
       stop: () => {
           isUpdate = false
       },
       start: () => {
           isUpdate = true
       },
       setCenterPos: (x, y, z) => {
           centerPoint[0] = x
           centerPoint[1] = y
           centerPoint[2] = z
       },
       update: () => {

       }
   }
}