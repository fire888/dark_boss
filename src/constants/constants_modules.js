import { LoaderAssets } from '../helpers/utils_loadAssets'
import { EventEmitter } from "../helpers/util_emitter"
import { UI } from '../componentsReact/UI'
import { DeviceResizer } from "../helpers/util_deviceResizer"
import { FrameUpdater } from "../helpers/util_frameUpater"
import { TweenUpdater } from "../helpers/TweenUpdater"
import { Studio } from '../entities/createStudio'
import { KeyBoard } from "../helpers/util_keyBoard"
import { Player } from '../entities/createPlayer'
import { PrepareMeshes } from '../helpers/helper_prepareMeshesFromAssets'
import { Level } from '../systems/system_level'
import { Bots } from '../systems/system_bots'
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
        key: 'prepareMeshes',
        constr: PrepareMeshes,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'level',
        constr: Level,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'bots',
        constr: Bots,
        initStateKey: 'beforeStartPlay',
    },
    {
        key: 'changerQuadrant',
        constr: ChangerQuadrant,
        initStateKey: 'beforeStartPlay',
    },
]