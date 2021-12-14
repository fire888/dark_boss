import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { Translater } from '../../../_CORE/helpers/helper_translate'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { UI } from '../../../_CORE/ui/UI'
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpater"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../../../_CORE/entities/createStudio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../../../_CORE/entities/createPlayer'
import { SystemCollisionWithItems } from "../../../_CORE/systems/SystemCollisionsItems";

import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'


import { Level } from '../systems/system_level'
//import levelRoomsSrc from '../../../assets/level_chapter04/level.obj'
import levelRoomsSrc from '../../../assets/level_chapter04/level02.obj'
import mapFloorOuter from '../../../assets/floor_outer_map.jpg'
import pxjpg from '../../../assets/skybox/px.jpg'
import nxjpg from '../../../assets/skybox/nx.jpg'
import pyjpg from '../../../assets/skybox/py.jpg'
import nyjpg from '../../../assets/skybox/ny.jpg'
import pzjpg from '../../../assets/skybox/pz.jpg'
import nzjpg from '../../../assets/skybox/nz.jpg'


import { StarterPlay } from '../actions/StarterPlay'




export const GAME_MODULES = [
    {
        key: 'emitter',
        constr: EventEmitter,
        initStateKey: 'pageLoaded',
    },
    // {
    //     key: 'translater',
    //     constr: Translater,
    //     initStateKey: 'pageLoaded',
    // },
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

    /////////////////////////////////////////

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
        key: 'systemCollisionFloor',
        constr: SystemCollisionWithItems,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'systemCollisionItems',
        constr: SystemCollisionWithItems,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'materialsLib',
        constr: Helper_MaterialsLib,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'level',
        constr: Level,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'obj', path: levelRoomsSrc, key: 'level-rooms' },
            { type: 'cubeTextures', path: [ pxjpg, nxjpg, pyjpg, nyjpg, pzjpg, nzjpg, ], key: 'skyBox' },
            { type: 'img', path: mapFloorOuter, key: 'mapFloorOuter', wrap: true },
        ],
    },
    {
        key: 'starterPlay',
        constr: StarterPlay,
        initStateKey: 'beforeStartPlay',
    },
]