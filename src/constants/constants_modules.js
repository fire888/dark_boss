import { LoaderAssets } from '../helpers/utils_loadAssets'
import { EventEmitter } from "../helpers/util_emitter"
import { UI } from '../componentsReact/UI'
import { DeviceResizer } from "../helpers/util_deviceResizer"
import { FrameUpdater } from "../helpers/util_frameUpater"
import { TweenUpdater } from "../helpers/TweenUpdater"
import { Studio } from '../entities/createStudio'
import { KeyBoard } from "../helpers/util_keyBoard"
import { Player } from '../entities/createPlayer'

import { MaterialsLib } from '../helpers/MaterialsLib'


import { Level } from '../systems/system_level'
import levelRoomsSrc from '../assets/level-rooms.obj'
import mapFloorOuter from '../assets/floor_outer_map.jpg'
import pxjpg from '../assets/skybox/px.jpg'
import nxjpg from '../assets/skybox/nx.jpg'
import pyjpg from '../assets/skybox/py.jpg'
import nyjpg from '../assets/skybox/ny.jpg'
import pzjpg from '../assets/skybox/pz.jpg'
import nzjpg from '../assets/skybox/nz.jpg'


import { Bots } from '../systems/system_bots'
import botMap from '../assets/botMap.png'
import botSrc from '../assets/botAnim2.glb'
import pxjpg2 from '../assets/matIronBox/posx.jpg'
import nxjpg2 from '../assets/matIronBox/negx.jpg'
import pyjpg2 from '../assets/matIronBox/posy.jpg'
import nyjpg2 from '../assets/matIronBox/negy.jpg'
import pzjpg2 from '../assets/matIronBox/posz.jpg'
import nzjpg2 from '../assets/matIronBox/negz.jpg'


import { ChangerQuadrant } from "../store/actionByChangeQuadrant"


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
        constr: TweenUpdater,
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
        constr: MaterialsLib,
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
        key: 'bots',
        constr: Bots,
        initStateKey: 'beforeStartPlay',
            assetsToLoad: [
                { type: 'glb', path: botSrc, key: 'bot' },
                { type: 'img', path: botMap, key: 'botMap' },
                { type: 'cubeTextures', path: [  pxjpg2, nxjpg2, pyjpg2, nyjpg2, pzjpg2, nzjpg2, ], key: 'ironEnv' },
            ]
    },
    {
        key: 'changerQuadrant',
        constr: ChangerQuadrant,
        initStateKey: 'beforeStartPlay',
    },
]