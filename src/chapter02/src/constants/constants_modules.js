import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { CustomUi } from '../ui/Ui'
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpater"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../../../_CORE/entities/createStudio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../../../_CORE/entities/createPlayer'
import { SystemCollisionWithItems } from '../../../_CORE/systems/SystemCollisionsItems'
import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'

import pxjpg from '../../../assets/chapter02/skybox/px.jpg'
import nxjpg from '../../../assets/chapter02/skybox/nx.jpg'
import pyjpg from '../../../assets/chapter02/skybox/py.jpg'
import nyjpg from '../../../assets/chapter02/skybox/ny.jpg'
import pzjpg from '../../../assets/chapter02/skybox/pz.jpg'
import nzjpg from '../../../assets/chapter02/skybox/nz.jpg'
import levelSrc from '../../../assets/chapter02/level.obj'
import { SystemLevel } from '../systems/system_Level'

import { SystemPlatforms } from '../systems/system_Platforms'

import terminalSrc from '../../../assets/chapter02/terminal.glb'
import { SystemTerminals } from '../systems/system_Terminals'

import { CheckerDialogWithTerminals } from '../systems/system_DialogsWithTerminals'



import { AdderActions } from "../actions/AdderActions"







export const GAME_MODULES = [
    {
        key: 'emitter',
        constr: EventEmitter,
        initStateKey: 'pageLoaded',
    },
    {
        key: 'customUi',
        constr: CustomUi,
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
        key: 'systemCollisionItems',
        constr: SystemCollisionWithItems,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'systemCollisionFloor',
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
        constr: SystemLevel,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'obj', path: levelSrc, key: 'level-rooms' },
            { type: 'cubeTextures', path: [ pxjpg, nxjpg ,pyjpg, nyjpg, pzjpg, nzjpg ], key: 'envTexture' },
        ],
    },
    {
        key: 'platforms',
        constr: SystemPlatforms,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'terminals',
        constr: SystemTerminals,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'glb', path: terminalSrc, key: 'terminal' },
        ]
    },
    {
        key: 'checkerDialogsWithTerminals',
        constr: CheckerDialogWithTerminals,
        initStateKey: 'beforeStartPlay',
    },
    // {
    //     key: 'doors',
    //     constr: SystemDoors,
    //     initStateKey: 'beforeStartPlay',
    //     assetsToLoad: [
    //         { type: 'img', path: doorTextureSrc, key: 'doorTexture', wrap: false },
    //     ]
    // },
    // {
    //     key: 'bots',
    //     constr: SystemBots ,
    //     initStateKey: 'beforeStartPlay',
    //     assetsToLoad: [
    //         { type: 'glb', path: botSrc, key: 'bot' },
    //         { type: 'img', path: botMap, key: 'monster-skin' },
    //     ]
    // },
    // {
    //     key: 'playerNearBot',
    //     constr: CheckerDialogWithBot,
    //     initStateKey: 'beforeStartPlay',
    // },
    {
        key: 'adderActions',
        constr: AdderActions,
        initStateKey: 'beforeStartPlay',
    },
]

