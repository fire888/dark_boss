import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Saturate } from '../shaders/saturate'

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
            this._scene.background = assets[backgroundImgKey] || null
            this._scene.fog = new THREE.Fog(color, fogNear, fogFar)
        }


        this._lightA = null
        {
            const { color, strength } = amb
            this._lightA = new THREE.AmbientLight( color, strength )
            this._scene.add( this._lightA )
        }

        this._camera = null
        this._camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 5000 );
        this._camera.position.set(0, 0, 20)

        const controls = new OrbitControls( this._camera, this._renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();


        this._composer = new EffectComposer(this._renderer)
        //this._composer.addPass(new RenderPass(this._scene, this._camera))




        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
        )
        box.matrixAutoUpdate = false
        setTimeout(() => {
            //box.matrixAutoUpdate = true
        }, 2000)

        this._scene.add(box)
        let scale = 1












        const resize = () => {
            const size = { width: window.innerWidth, height: window.innerHeight }
            this._renderer.setSize(size.width, size.height)
            this._composer.setSize(size.width, size.height)
            if (this._camera) {
                this._camera.aspect = size.width/size.height
                this._camera.updateProjectionMatrix()
            }
        }
        window.addEventListener('resize', resize)
        resize()




        this.addToScene = this._scene.add.bind(this._scene)
        const drawFrame = () => {
            // scale += 0.01
            // box.matrix.set(...[
            //     scale, 0, 0, 0,
            //     0, scale, 0, 0,
            //     0, 0, scale, 0,
            //     0, 0, 0, 1,
            // ])


            this._camera && this._composer.render(this._scene, this._camera)
        }
        emitter.subscribe('frameUpdate')(drawFrame)



        this._backgroundImgKey = root.CONSTANTS.studioConfig.sceneEnvironment.backgroundImgKey



        emitter.subscribe('changeSceneEnvironment')(sceneEnvironment => {
            console.log('deprecated!!', 'studio', 'changeSceneEnvironment', sceneEnvironment)
        })
    
    }


    /** PUBLIC ****************************************/

    setCamera (cam) {
        this._camera = cam
        this._composer.addPass(new RenderPass(this._scene, this._camera))
        
        if (!this._root.CONSTANTS.studioConfig.composerAddPass) return; 
        
        if (this._root.CONSTANTS.studioConfig.composerAddPass === 'Saturate') {
            this._composer.addPass(new ShaderPass(Saturate))
        }  
    }

    changeEnvironment (sceneEnvironment) {
        this._changeFog(sceneEnvironment)
        this._changeBackground(sceneEnvironment)
    }


    /** INTERNAL ****************************************/

    _changeFog (sceneEnvironment) {
        const { fogNear, fogFar, color } = sceneEnvironment
        if (
            this._scene.fog.near !== fogNear ||
            this._scene.fog.far !== fogFar ||
            this._scene.fog.color !== fogFar
        ) {
            const startData = {
                color: this._scene.fog.color,
                near: this._scene.fog.near,
                far: this._scene.fog.far,
            }
            const endData = {
                color: new THREE.Color(color),
                near: fogNear,
                far: fogFar,
            }

            new TWEEN.Tween(startData)
                .to(endData, 3000)
                .onUpdate(() => {
                    this._scene.fog.color = startData.color
                    this._scene.fog.near = startData.near
                    this._scene.fog.far = startData.far
                    this._lightA.color = startData.color
                    this._renderer.setClearColor(startData.color)
                })
                .start()
        }

    }


    _changeBackground (sceneEnvironment) {
        const { backgroundImgKey } = sceneEnvironment

        if (backgroundImgKey !== this._backgroundImgKey) {
            this._backgroundImgKey = backgroundImgKey
            this._scene.background = this._root.assets[backgroundImgKey] || null
        }
    }
}

