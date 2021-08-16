import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
//import { PreInitModules } from '../actions/PreInitModules'
import { UI } from '../ui/Ui'
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpater"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../../../_CORE/entities/createStudio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../../../_CORE/entities/createPlayer'
import { StarterPlay } from "../actions/StarterPlay";

import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'


import { SystemLevel } from '../systems/system_Level'
import levelSrc from '../../../assets/chapter01/level.obj'
import levelCollisionSrc from '../../../assets/chapter01/level-ray.obj'
// import mapFloorOuter from '../../assets/floor_outer_map.jpg'
// import pxjpg from '../../assets/skybox/px.jpg'
// import nxjpg from '../../assets/skybox/nx.jpg'
// import pyjpg from '../../assets/skybox/py.jpg'
// import nyjpg from '../../assets/skybox/ny.jpg'
// import pzjpg from '../../assets/skybox/pz.jpg'
// import nzjpg from '../../assets/skybox/nz.jpg'


// import { Bots } from '../systems/system_bots'
// import botMap from '../../assets/botMap.png'
// import botSrc from '../../assets/botAnim2.glb'
// import pxjpg2 from '../../assets/matIronBox/posx.jpg'
// import nxjpg2 from '../../assets/matIronBox/negx.jpg'
// import pyjpg2 from '../../assets/matIronBox/posy.jpg'
// import nyjpg2 from '../../assets/matIronBox/negy.jpg'
// import pzjpg2 from '../../assets/matIronBox/posz.jpg'
// import nzjpg2 from '../../assets/matIronBox/negz.jpg'


// import { ChangerQuadrant } from "../store/actionByChangeQuadrant"
// import { Component_PlayerInBot } from '../components/component_playerInBot'
// import { StarterPlay } from '../actions/StarterPlay'
// import { EnderPlay } from '../actions/EnderPlay'


export const GAME_MODULES = [
    {
        key: 'emitter',
        constr: EventEmitter,
        initStateKey: 'pageLoaded',
    },
    // {
    //     key: 'preInitModules',
    //     constr: PreInitModules,
    //     initStateKey: 'pageLoaded',
    // },
    {
        key: 'ui',
        constr: UI,
        initStateKey: 'pageLoaded',
    },
    {
         key: 'deviceResizer',
         constr: DeviceResizer,
         initStateKey: 'pageLoaded',
    },
    {
        key: 'loaderAssets',
        constr: LoaderAssets,
        initStateKey: 'pageLoaded',
    },

    // /////////////////////////////////////////

    {
         key: 'frameUpdater',
         constr: FrameUpdater,
         initStateKey: 'beforeStartPlay',
    },
    {
         key: 'tweenUpdater',
         constr: Helper_TweenUpdater,
         initStateKey: 'beforeStartPlay',
    },
    {
         key: 'studio',
         constr: Studio,
         initStateKey: 'beforeStartPlay',
    },
    {
         key: 'keyBoard',
         constr: KeyBoard,
         initStateKey: 'beforeStartPlay',
    },
    {
         key: 'player',
         constr: Player,
         initStateKey: 'beforeStartPlay',
    },
    {
         key: 'materialsLib',
         constr: Helper_MaterialsLib,
         initStateKey: 'beforeStartPlay',
    },
    {
        key: 'level',
        constr: SystemLevel,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'obj', path: levelSrc, key: 'level-rooms' },
            { type: 'obj', path: levelCollisionSrc, key: 'levelCollisions' },
            //{ type: 'cubeTextures', path: [ pxjpg, nxjpg, pyjpg, nyjpg, pzjpg, nzjpg, ], key: 'skyBox' },
            //{ type: 'img', path: mapFloorOuter, key: 'mapFloorOuter', wrap: true },
        ],
    },
    // {
    //     key: 'bots',
    //     constr: Bots,
    //     initStateKey: 'beforeStartPlay',
    //         assetsToLoad: [
    //             { type: 'glb', path: botSrc, key: 'bot' },
    //             { type: 'img', path: botMap, key: 'botMap' },
    //             { type: 'cubeTextures', path: [  pxjpg2, nxjpg2, pyjpg2, nyjpg2, pzjpg2, nzjpg2, ], key: 'ironEnv' },
    //         ]
    // },
    // {
    //     key: 'changerQuadrant',
    //     constr: ChangerQuadrant,
    //     initStateKey: 'beforeStartPlay',
    // },
    // {
    //     key: 'playerInBot',
    //     constr: Component_PlayerInBot,
    //     initStateKey: 'beforeStartPlay',
    // },
    {
        key: 'starterPlay',
        constr: StarterPlay,
        initStateKey: 'beforeStartPlay',
    },
    // {
    //     key: 'enderPlay',
    //     constr: EnderPlay,
    //     initStateKey: 'beforeStartPlay',
    // },
]