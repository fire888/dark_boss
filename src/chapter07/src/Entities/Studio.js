import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Saturate } from '../../../_CORE/shaders/saturate'
import { Saturate2 } from '../../../_CORE/shaders/saturate2'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



export class Studio {
    constructor(root) {
        this._root = root
        const { assets, emitter, } = root
        const { canId, rendererCon } = root.CONSTANTS.studioConfig

        rendererCon.canvas = document.getElementById(canId)

        this._renderer = new THREE.WebGLRenderer(rendererCon)
        //this._renderer.outputEncoding = THREE.sRGBEncoding;
        //this._renderer.setClearColor(clearColor)
        this._renderer.setClearColor(0x000000)
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(window.innerWidth, window.innerHeight)

        this._scene = new THREE.Scene()

        // {
        //     const { color, fogNear, fogFar, backgroundImgKey } = root.CONSTANTS.studioConfig.sceneEnvironment
        //     this._scene.background = assets[backgroundImgKey] || null
        //     this._scene.fog = new THREE.Fog(color, fogNear, fogFar)
        // }

        //this._lightA = new THREE.AmbientLight(0x455861, 1)
        this._lightA = new THREE.AmbientLight(0x777777, .7)
        this._scene.add( this._lightA )

        const l = new THREE.DirectionalLight(0xffffff, 1)
        // l.rotation.x = -1
        // l.rotation.z = -2
        this._scene.add(l)
        const targetObject = new THREE.Object3D();
        this._scene.add(targetObject);
        l.target = targetObject;
        targetObject.position.x = -1


        this._playerCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000)
        this._controlsCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000)
        this._controlsCamera.position.set(0, 500, 100)
        const controls = new OrbitControls(this._controlsCamera, this._renderer.domElement)
        controls.target.set(0, 0, 0)
        controls.update();


        // this._composer = new EffectComposer(this._renderer)
        // this._renderPass = new RenderPass(this._scene, this._controlsCamera)
        // this._composer.addPass(this._renderPass)
        // if (this._root.CONSTANTS.studioConfig.composerAddPass) {
        //     if (this._root.CONSTANTS.studioConfig.composerAddPass === 'Saturate') {
        //         this._composer.addPass(new ShaderPass(Saturate))
        //     }
        //     if (this._root.CONSTANTS.studioConfig.composerAddPass === 'Saturate2') {
        //         this._composer.addPass(new ShaderPass(Saturate2))
        //     }
        // }



        /** toggle view camera to debug by orbitControls */
        const vec3 = new THREE.Vector3()
        let isPlayerView = true
        let saveFogData = null


        const toggleView = () => {
            if (isPlayerView) {
                //saveFogData = { ...this._scene.fog }
                //this._scene.fog.near = 10000
                //this._scene.fog.far = 20000
                isPlayerView = false

                //this._renderPass.camera = this._controlsCamera
                this._playerCamera.getWorldPosition(vec3)
                //this._controlsCamera.position.x = vec3.x + 100
                //this._controlsCamera.position.y = vec3.y + 100
                //this._controlsCamera.position.z = vec3.z
                //controls.target.set(vec3.x, vec3.y, vec3.z)
                controls.update()

                // this._scene.fog.near = saveFogData.near
                // this._scene.fog.far = saveFogData.far

            } else {
                //this._scene.fog.near = saveFogData.near
                //this._scene.fog.far = saveFogData.far
                isPlayerView = true
                this._renderPass.camera = this._playerCamera
            }
        }

        emitter.subscribe('keyEvent')(data => {
            if (!data['o']) {
                return;
            }

            toggleView()
        })



        const resize = () => {
            const size = { width: window.innerWidth, height: window.innerHeight }
            this._renderer.setSize(size.width, size.height)
            // this._composer.setSize(size.width, size.height)
            if (this._controlsCamera) {
                this._controlsCamera.aspect = size.width / size.height
                this._controlsCamera.updateProjectionMatrix()
            }
            if (this._playerCamera) {
                this._playerCamera.aspect = size.width/size.height
                this._playerCamera.updateProjectionMatrix()
            }
        }
        window.addEventListener('resize', resize)
        resize()




        this.addToScene = mesh => this._scene.add(mesh)
        this.removeFromScene = mesh => this._scene.remove(mesh)



        let f = 0
        this.drawFrame = () => {
            f += 0.01
            //l.position.x = Math.sin(f) * 5
            //l.position.z = Math.cos(f) * 5
            this._renderer.render(this._scene, this._controlsCamera)
           // this._composer.render(this._scene, this._controlsCamera)
        }


        //this._backgroundImgKey = root.CONSTANTS.studioConfig.sceneEnvironment.backgroundImgKey
        emitter.subscribe('changeSceneEnvironment')(sceneEnvironment => {
            console.log('deprecated!!', 'studio', 'changeSceneEnvironment', sceneEnvironment)
        })


        setTimeout(() => { toggleView() }, 200)
    }


    /** PUBLIC ****************************************/

    setCamera (cam) {
        cam.aspect = window.innerWidth / window.innerHeight
        cam.updateProjectionMatrix()
        this._playerCamera = cam
        //this._renderPass.camera = this._playerCamera
    }


    changeEnvironment (sceneEnvironment, conf = null) {
        this._changeFog(sceneEnvironment, conf)
        this._changeBackground(sceneEnvironment, conf)
    }


    /** INTERNAL ****************************************/

    _changeFog (sceneEnvironment, conf) {
        // const { fogNear, fogFar, colorFog } = sceneEnvironment
        // if (
        //     this._scene.fog.near !== fogNear ||
        //     this._scene.fog.far !== fogFar ||
        //     this._scene.fog.color !== fogFar
        // ) {
        //     const startData = {
        //         colorFog: this._scene.fog.color,
        //         near: this._scene.fog.near,
        //         far: this._scene.fog.far,
        //     }
        //     const endData = {
        //         colorFog: new THREE.Color(colorFog),
        //         near: fogNear,
        //         far: fogFar,
        //     }
        //
        //     new TWEEN.Tween(startData)
        //         .to(endData, (conf && conf.time) || 3000)
        //         .onUpdate(() => {
        //             this._scene.fog.color = startData.colorFog
        //             this._scene.fog.near = startData.near
        //             this._scene.fog.far = startData.far
        //             if (conf) {
        //                 //                 if (conf.updateAmb) this._lightA.color = startData.color
        //             } else {
        //                 //                 this._lightA.color = startData.color
        //             }
        //             //this._renderer.setClearColor(startData.color)
        //         })
        //         .onComplete(() => {
        //             this._renderer.setClearColor(sceneEnvironment.colorBack)
        //         })
        //         .start()
        // }

    }


    _changeBackground (sceneEnvironment) {
        // const { backgroundImgKey } = sceneEnvironment
        //
        // if (backgroundImgKey !== this._backgroundImgKey) {
        //     this._backgroundImgKey = backgroundImgKey
        //     this._scene.background = this._root.assets[backgroundImgKey] || null
        // }
    }
}

