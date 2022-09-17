import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Saturate } from '../shaders/saturate'
import { Saturate2 } from '../shaders/saturate2'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



export class Studio {
    constructor(root) {
        this._root = root
        const { assets, emitter, } = root
        const { canId, rendererCon, clearColor, amb } = root.CONSTANTS.studioConfig

        rendererCon.canvas = document.getElementById(canId)

        this._renderer = new THREE.WebGLRenderer(rendererCon)
        this._renderer.setClearColor(clearColor)
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(window.innerWidth, window.innerHeight)

        this._scene = new THREE.Scene()

        {
            const { color, fogNear, fogFar, backgroundImgKey } = root.CONSTANTS.studioConfig.sceneEnvironment
            //this._scene.background = assets[backgroundImgKey] || null
            //this._scene.fog = new THREE.Fog(color, fogNear, fogFar)
        }


        this._lightA = null
        {
            const { color, strength } = amb
            this._lightA = new THREE.AmbientLight( color, strength )
            this._scene.add( this._lightA )
        }

        this._playerCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000)


        this._controlsCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000)
        this._controlsCamera.position.set(0, 0, 20)
        const controls = new OrbitControls(this._controlsCamera, this._renderer.domElement)
        controls.target.set(0, 0, 0)
        controls.update();


        this._composer = new EffectComposer(this._renderer)
        this._renderPass = new RenderPass(this._scene, this._controlsCamera)
        this._composer.addPass(this._renderPass)
        if (this._root.CONSTANTS.studioConfig.composerAddPass) {
            if (this._root.CONSTANTS.studioConfig.composerAddPass === 'Saturate') {
                this._composer.addPass(new ShaderPass(Saturate))
            }
            if (this._root.CONSTANTS.studioConfig.composerAddPass === 'Saturate2') {
                this._composer.addPass(new ShaderPass(Saturate2))
            }
        }



        /** toggle view camera to debug by orbitControls */
        const vec3 = new THREE.Vector3()
        let isPlayerView = true
        let saveFogData = null
        emitter.subscribe('keyEvent')(data => {
            if (!data['o']) {
                return;
            }

            if (isPlayerView) {
//                saveFogData = { ...this._scene.fog }
                // this._scene.fog.near = 1000
                // this._scene.fog.far = 2000
                isPlayerView = false
                this._renderPass.camera = this._controlsCamera
                this._playerCamera.getWorldPosition(vec3)
                this._controlsCamera.position.x = vec3.x + 100
                this._controlsCamera.position.y = vec3.y + 100
                this._controlsCamera.position.z = vec3.z
                controls.target.set(vec3.x, vec3.y, vec3.z)
                controls.update()
            } else {
                this._scene.fog.near = saveFogData.near
                this._scene.fog.far = saveFogData.far
                isPlayerView = true
                this._renderPass.camera = this._playerCamera
            }
        })



        const resize = () => {
            const size = { width: window.innerWidth, height: window.innerHeight }
            this._renderer.setSize(size.width, size.height)
            this._composer.setSize(size.width, size.height)
            if (this._controlsCamera) {
                this._controlsCamera.aspect = size.width/size.height
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



        this.drawFrame = () => {
            this._composer.render(this._scene, this._controlsCamera)
        }
        //emitter.subscribe('frameUpdate')(this.drawFrame)



        this._backgroundImgKey = root.CONSTANTS.studioConfig.sceneEnvironment.backgroundImgKey
        emitter.subscribe('changeSceneEnvironment')(sceneEnvironment => {
            console.log('deprecated!!', 'studio', 'changeSceneEnvironment', sceneEnvironment)
        })
    }


    /** PUBLIC ****************************************/

    setCamera (cam) {
        this._playerCamera = cam
        this._renderPass.camera = this._playerCamera
    }


    changeEnvironment (sceneEnvironment, conf = null) {
        this._changeFog(sceneEnvironment, conf)
        this._changeBackground(sceneEnvironment, conf)
    }


    /** INTERNAL ****************************************/

    _changeFog (sceneEnvironment, conf) {
        // const { fogNear, fogFar, color } = sceneEnvironment
        // if (
        //     this._scene.fog.near !== fogNear ||
        //     this._scene.fog.far !== fogFar ||
        //     this._scene.fog.color !== fogFar
        // ) {
        //     const startData = {
        //         color: this._scene.fog.color,
        //         near: this._scene.fog.near,
        //         far: this._scene.fog.far,
        //     }
        //     const endData = {
        //         color: new THREE.Color(color),
        //         near: fogNear,
        //         far: fogFar,
        //     }
        //
        //     new TWEEN.Tween(startData)
        //         .to(endData, (conf && conf.time) || 3000)
        //         .onUpdate(() => {
        //             // this._scene.fog.color = startData.color
        //             // this._scene.fog.near = startData.near
        //             // this._scene.fog.far = startData.far
        //             if (conf) {
        //                 if (conf.updateAmb) this._lightA.color = startData.color
        //             } else {
        //                 this._lightA.color = startData.color
        //             }
        //             this._renderer.setClearColor(startData.color)
        //         })
        //         .start()
        // }

    }


    _changeBackground (sceneEnvironment) {
        const { backgroundImgKey } = sceneEnvironment

        if (backgroundImgKey !== this._backgroundImgKey) {
            this._backgroundImgKey = backgroundImgKey
            this._scene.background = this._root.assets[backgroundImgKey] || null
        }
    }
}

