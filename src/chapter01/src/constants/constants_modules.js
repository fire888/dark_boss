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
import { StarterPlay } from "../actions/StarterPlay"

import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'


import { SystemLevel } from '../systems/system_Level'
import levelSrc from '../../../assets/chapter01/level.obj'
import wallTextureSrc from '../../../assets/chapter01/wall.jpg' 
import levelCollisionSrc from '../../../assets/chapter01/level-ray.obj'


import { SystemDoors } from '../systems/system_Doors'
import doorTextureSrc from '../../../assets/chapter01/door.jpg'


import { SystemBots } from "../systems/system_Bots"
import botSrc from '../../../assets/chapter01/monster-animate3.glb'
import botMap from "../../../assets/chapter01/monster-skin.jpg";


import { CheckerDialogWithBot } from "../systems/system_CheckerDialogWithBot";


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
            { type: 'obj', path: levelCollisionSrc, key: 'levelCollisions' },
            { type: 'img', path: wallTextureSrc, key: 'wallTexture', wrap: true },
        ],
    },
    {
        key: 'doors',
        constr: SystemDoors,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'img', path: doorTextureSrc, key: 'doorTexture', wrap: false }, 
        ] 
    },
    {
        key: 'bots',
        constr: SystemBots ,
        initStateKey: 'beforeStartPlay',
        assetsToLoad: [
            { type: 'glb', path: botSrc, key: 'bot' },
            { type: 'img', path: botMap, key: 'monster-skin' },
        ]
    },
    {
        key: 'playerNearBot',
        constr: CheckerDialogWithBot,
        initStateKey: 'beforeStartPlay',   
    },
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