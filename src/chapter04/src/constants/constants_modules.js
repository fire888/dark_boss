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
import levelRoomsSrc from '../../../assets/chapter04/level02.obj'
import mapFloorOuter from '../../../assets/chapter04/floor_outer_map3.jpg'
import mapFloorOuter2 from '../../../assets/chapter04/floor_outer_map2.jpg'
import mapTop from '../../../assets/floor_outer_map.jpg'
import pxjpg from '../../../assets/sky3/px.jpg'
import nxjpg from '../../../assets/sky3/nx.jpg'
import pyjpg from '../../../assets/sky3/py.jpg'
import nyjpg from '../../../assets/sky3/ny.jpg'
import pzjpg from '../../../assets/sky3/pz.jpg'
import nzjpg from '../../../assets/sky3/nz.jpg'

import px2jpg from '../../../assets/sky2/px.jpg'
import nx2jpg from '../../../assets/sky2/nx.jpg'
import py2jpg from '../../../assets/sky2/py.jpg'
import ny2jpg from '../../../assets/sky2/ny.jpg'
import pz2jpg from '../../../assets/sky2/pz.jpg'
import nz2jpg from '../../../assets/sky2/nz.jpg'


import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel' 


import { system_Monsters } from '../systems/system_Monsters'
import botSrc from '../../../assets/chapter04/botWalk.gltf'
import monsterSkinSrc from '../../../assets/chapter04/skin.jpg'

import { system_PrepareDialogs } from '../systems/system_PrepareDialogs'
import { StarterPlay } from '../actions/StarterPlay'
import { Ui } from "../ui/Ui";




export const GAME_MODULES = [
    {
        key: 'emitter',
        constr: EventEmitter,
        initStateKey: 'pageLoaded',
    },
    // {
    //     key: 'ui',
    //     constr: UI,
    //     initStateKey: 'pageLoaded',
    // },
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
            { type: 'cubeTextures', path: [ px2jpg, nx2jpg, py2jpg, ny2jpg, pz2jpg, nz2jpg, ], key: 'skyBox2' },
            { type: 'img', path: mapFloorOuter, key: 'mapFloorOuter', wrap: true },
            { type: 'img', path: mapFloorOuter2, key: 'mapFloorOuter2', wrap: true },
            { type: 'img', path: mapTop, key: 'mapTop', wrap: true },
        ],
    },
    {
        key: 'system_PlayerMoveOnLevel',
        constr: system_PlayerMoveOnLevel,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'system_Monsters',
        constr: system_Monsters,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'glb', path: botSrc, key: 'bot' },
            { type: 'img', path: monsterSkinSrc, key: 'skin', wrap: true },
        ]
    },
    {
        key: 'system_PrepareDialogs',
        constr: system_PrepareDialogs,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'customUi',
        constr: Ui,
        initStateKey: 'pageLoaded',
    },
    {
        key: 'starterPlay',
        constr: StarterPlay,
        initStateKey: 'beforeStartPlay',
    },
]