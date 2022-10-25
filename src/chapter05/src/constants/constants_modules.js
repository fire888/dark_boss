import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpdater_02"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../../../_CORE/entities/createStudio_02'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../../../_CORE/entities/createPlayer_v02'


import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'
import { SystemAssets } from "../systems/systems_assets";
import levelRoomsSrc from '../../../assets/chapter05/level.obj'
import mapFloorOuter from '../../../assets/chapter04/floor_outer_map3.jpg'
import mapVirt2 from '../../../assets/chapter05/map02.jpg'
import mapTop from '../../../assets/chapter05/floor_outer_map.jpg'
import mapTxt from '../../../assets/chapter05/txt1.jpg'

import mapBody from '../../../assets/chapter05/botMap.png'
import mapBodyShadow from '../../../assets/chapter05/body_sh_map.jpg'

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

import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel'
import { system_PlayerNearLevelItems } from '../systems/system_PlayerNearLevelItems'


import { actions } from '../actions/actions'
import { Ui } from "../ui/Ui";

import { system_Sound } from '../systems/system_Sound'
import soundAmbientSrc from '../../../assets/chapter05/audio/ambient.mp3'
import carStart from '../../../assets/chapter05/audio/ambient_intro.mp3'
import carLoop from '../../../assets/chapter05/audio/ambient_loop.mp3'




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
        key: 'system_Assets',
        constr: SystemAssets,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'obj', path: levelRoomsSrc, key: 'level-rooms' },
            { type: 'cubeTextures', path: [ nxjpg, nxjpg, nxjpg, nxjpg, nxjpg, nxjpg, ], key: 'skyBox' },
            { type: 'cubeTextures', path: [ px2jpg, nx2jpg, py2jpg, ny2jpg, pz2jpg, nz2jpg, ], key: 'skyBox2' },
            { type: 'img', path: mapFloorOuter, key: 'mapFloorOuter', wrap: true },
            { type: 'img', path: mapTop, key: 'mapTop', wrap: true },
            { type: 'img', path: mapVirt2, key: 'mapVirtual2', wrap: true },
            { type: 'img', path: mapTxt, key: 'mapParams' },
            { type: 'img', path: mapBody, key: 'mapBody' },
            { type: 'img', path: mapBodyShadow, key: 'mapBodySh' },
        ],
    },
    {
        key: 'car',
        constr: Car,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'system_PlayerMoveOnLevel',
        constr: system_PlayerMoveOnLevel,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'system_Sound',
        constr: system_Sound,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'soundMp3', path: soundAmbientSrc, key: 'soundAmbient' },
            { type: 'soundMp3', path: carStart, key: 'carStart' },
            { type: 'soundMp3', path: carLoop, key: 'carLoop' },
        ]
    },
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