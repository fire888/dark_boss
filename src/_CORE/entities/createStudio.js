import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'



export class Studio {
    constructor(gameContext) {
        const { assets, emitter, } = gameContext
        const { canId, rendererCon, clearColor, amb } = gameContext.CONSTANTS.studioConfig

        rendererCon.canvas = document.getElementById(canId)

        const renderer = new THREE.WebGLRenderer(rendererCon)
        renderer.setClearColor(clearColor)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        this._scene = new THREE.Scene()

        {
            // if (store) {
            //     const { color, fogNear, fogFar, backgroundImgKey } = store.getState().app.sceneEnvironment
            //     this._scene.background = assets[backgroundImgKey] || null
            //     this._scene.fog = new THREE.Fog(color, fogNear, fogFar)
            // } else {
                const { color, fogNear, fogFar, backgroundImgKey } = gameContext.CONSTANTS.studioConfig.sceneEnvironment
                this._scene.background = assets[backgroundImgKey] || null
                this._scene.fog = new THREE.Fog(color, fogNear, fogFar)
            //}
        }


        let lightA
        {
            const { color, strength } = amb
            lightA = new THREE.AmbientLight( color, strength )
            this._scene.add( lightA )
        }

        this._camera = null


        this._composer = new EffectComposer(renderer)
        //composer.addPass(new RenderPass(scene, camera))



        const resize = () => {
            const size = { width: window.innerWidth, height: window.innerHeight }
            renderer.setSize(size.width, size.height)
            this._composer.setSize(size.width, size.height)
            if (this._camera) {
                this._camera.aspect = size.width/size.height
                this._camera.updateProjectionMatrix()
            }
        }
        window.addEventListener('resize', resize)
        resize()




        this.addToScene = this._scene.add.bind(this._scene)
        const drawFrame = () => this._camera && this._composer.render(this._scene, this._camera)
        emitter.subscribe('frameUpdate')(drawFrame)





        let
            oldFogNear = this._scene.fog.near,
            oldFogFar = this._scene.fog.far,
            oldColor = this._scene.fog.color,
            oldBackgroundImgKey = gameContext.CONSTANTS.studioConfig.sceneEnvironment.backgroundImgKey



            emitter.subscribe('changeSceneEnvironment')(sceneEnvironment => {
                const { fogNear, fogFar, color, backgroundImgKey } = sceneEnvironment
    
                if (fogNear !== oldFogNear || fogFar !== oldFogFar || color !== oldColor ) {
                    let startData = {
                        color: this._scene.fog.color,
                        near: this._scene.fog.near,
                        far: this._scene.fog.far,
                    }
                    let endData = {
                        color: new THREE.Color(color),
                        near: fogNear,
                        far: fogFar,
                    }
    
                    oldFogNear = fogNear
                    oldFogFar = fogFar
                    oldColor = color
    
                    new TWEEN.Tween(startData)
                        .to(endData, 3000)
                        .onUpdate(() => {
                            this._scene.fog.color = startData.color
                            this._scene.fog.near = startData.near
                            this._scene.fog.far = startData.far
                            lightA.color = startData.color
                            renderer.setClearColor(startData.color)
                        })
                        .start()
                }
    
    
                if (backgroundImgKey !== oldBackgroundImgKey) {
                    oldBackgroundImgKey = backgroundImgKey
                    this._scene.background = assets[backgroundImgKey] || null
                }
            })
    
    }

    setCamera (cam) {
        this._camera = cam
        this._composer.addPass(new RenderPass(this._scene, this._camera))
    }
}

