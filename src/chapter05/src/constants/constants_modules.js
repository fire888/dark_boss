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
import levelRoomsSrc from '../../../assets/chapter05/level.obj'
import mapFloorOuter from '../../../assets/chapter04/floor_outer_map3.jpg'
import mapFloorOuter2 from '../../../assets/chapter04/floor_outer_map2.jpg'
import mapVirt from '../../../assets/chapter05/map01.jpg'
import mapTop from '../../../assets/floor_outer_map.jpg'

import pxjpg from '../../../assets/sky4/px.jpg'
import nxjpg from '../../../assets/sky4/nx.jpg'
import pyjpg from '../../../assets/sky4/py.jpg'
import nyjpg from '../../../assets/sky4/ny.jpg'
import pzjpg from '../../../assets/sky4/pz.jpg'
import nzjpg from '../../../assets/sky4/nz.jpg'

import px2jpg from '../../../assets/sky2/px.jpg'
import nx2jpg from '../../../assets/sky2/nx.jpg'
import py2jpg from '../../../assets/sky2/py.jpg'
import ny2jpg from '../../../assets/sky2/ny.jpg'
import pz2jpg from '../../../assets/sky2/pz.jpg'
import nz2jpg from '../../../assets/sky2/nz.jpg'

import { Car } from '../Entities/Car'
import carSrc from '../../../assets/chapter05/car.obj'
import carCollisionSrc from '../../../assets/chapter05/car_collision.obj'
import bodySrc from '../../../assets/chapter05/body.obj'


import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel'
import { system_PlayerNearLevelItems } from '../systems/system_PlayerNearLevelItems'


//import { system_Monsters } from '../systems/system_Monsters'
//import botSrc from '../../../assets/chapter04/botWalk.gltf'
//import monsterSkinSrc from '../../../assets/chapter04/skin.jpg'

import { system_Columns } from '../systems/system_Columns'

//import { system_PrepareDialogs } from '../systems/system_PrepareDialogs'

import { actions } from '../actions/actions'
import { Ui } from "../ui/Ui";

//import { system_Sound } from '../systems/system_Sound'
//import soundAmbientSrc from '../../../assets/sound/ambient.mp3'




export const GAME_MODULES = [
    {
        key: 'emitter',
        constr: EventEmitter,
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
        key: 'system_PlayerNearLevelItems',
        constr: system_PlayerNearLevelItems,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'materialsLib',
        constr: Helper_MaterialsLib,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'car',
        constr: Car,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'obj', path: carSrc, key: 'car' },
            { type: 'obj', path: carCollisionSrc, key: 'carCollision' },
        ],
    },
    {
        key: 'system_Level',
        constr: Level,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'obj', path: levelRoomsSrc, key: 'level-rooms' },
            { type: 'obj', path: bodySrc, key: 'body' },
            { type: 'cubeTextures', path: [ pxjpg, nxjpg, pyjpg, nyjpg, pzjpg, nzjpg, ], key: 'skyBox' },
            { type: 'cubeTextures', path: [ px2jpg, nx2jpg, py2jpg, ny2jpg, pz2jpg, nz2jpg, ], key: 'skyBox2' },
            { type: 'img', path: mapFloorOuter, key: 'mapFloorOuter', wrap: true },
            //{ type: 'img', path: mapFloorOuter2, key: 'mapFloorOuter2', wrap: true },
            { type: 'img', path: mapTop, key: 'mapTop', wrap: true },
            { type: 'img', path: mapVirt, key: 'mapVirtual', wrap: true },
        ],
    },
    {
        key: 'system_PlayerMoveOnLevel',
        constr: system_PlayerMoveOnLevel,
        initStateKey: 'beforeStartPlay',
    },
    // {
    //     key: 'system_Columns',
    //     constr: system_Columns,
    //     initStateKey: 'beforeStartPlay',
    // },
    // {
    //     key: 'system_Monsters',
    //     constr: system_Monsters,
    //     initStateKey: 'beforeStartPlay',
    //     assetsToLoad: [
    //         { type: 'glb', path: botSrc, key: 'bot' },
    //         { type: 'img', path: monsterSkinSrc, key: 'skin', wrap: true },
    //     ]
    // },
    // {
    //     key: 'system_PrepareDialogs',
    //     constr: system_PrepareDialogs,
    //     initStateKey: 'beforeStartPlay',
    // },
    // {
    //     key: 'system_Sound',
    //     constr: system_Sound,
    //     initStateKey: 'beforeStartPlay',
    //     assetsToLoad: [
    //         { type: 'soundMp3', path: soundAmbientSrc, key: 'soundAmbient' },
    //     ]
    // },

    {
        key: 'customUi',
        constr: Ui,
        initStateKey: 'pageLoaded',
    },
    {
        key: 'actions',
        constr: actions,
        initStateKey: 'beforeStartPlay',
    },
]