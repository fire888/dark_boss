import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { UI } from '../../../_CORE/ui/UI'
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpater"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../../../_CORE/entities/createStudio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../../../_CORE/entities/createPlayer_v02'


import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'


import { Level } from '../systems/system_level'
import levelRoomsSrc from '../../../assets/level_chapter04/level02.obj'
import mapFloorOuter from '../../../assets/level_chapter04/floor_outer_map.jpg'
import mapFloorOuter2 from '../../../assets/level_chapter04/floor_outer_map2.jpg'
import pxjpg from '../../../assets/sky2/px.jpg'
import nxjpg from '../../../assets/sky2/nx.jpg'
import pyjpg from '../../../assets/sky2/py.jpg'
import nyjpg from '../../../assets/sky2/ny.jpg'
import pzjpg from '../../../assets/sky2/pz.jpg'
import nzjpg from '../../../assets/sky2/nz.jpg'


import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel' 
import { StarterPlay } from '../actions/StarterPlay'




export const GAME_MODULES = [
    {
        key: 'emitter',
        constr: EventEmitter,
        initStateKey: 'pageLoaded',
    },
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
    // {
    //     key: 'systemCollisionFloor',
    //     constr: SystemCollisionWithItems,
    //     initStateKey: 'beforeStartPlay',
    // },
    // {
    //     key: 'systemCollisionItems',
    //     constr: SystemCollisionWithItems,
    //     initStateKey: 'beforeStartPlay',
    // },
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
            { type: 'img', path: mapFloorOuter2, key: 'mapFloorOuter2', wrap: true },
        ],
    },
    {
        key: 'system_PlayerMoveOnLevel',
        constr: system_PlayerMoveOnLevel,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'starterPlay',
        constr: StarterPlay,
        initStateKey: 'beforeStartPlay',
    },
]