import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpdater_02"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../Entities/Studio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../Entities/player'

import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel'
import { actions } from '../actions/actions'
import { Ui } from "../ui/Ui"

import textureTiles from '../../../assets/chapter07/texture01.jpg'
import textureTilesInv from '../../../assets/chapter07/texture01_inv.jpg'

import { system_Sound } from '../systems/system_Sound'
import soundStepsSrc from '../../../assets/chapter06/audio/steps.mp3'
import soundAmbientSrc from '../../../assets/chapter07/ambient_07.mp3'
import soundPlatformSrc from '../../../assets/chapter07/fly.mp3'

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
            { type: 'soundMp3', path: soundStepsSrc, key: 'soundStep' },
            { type: 'soundMp3', path: soundPlatformSrc, key: 'soundPlatform' },
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
            assetsToLoad: [
                { type: 'img', path: textureTiles, key: 'textureTiles', wrap: false },
                { type: 'img', path: textureTilesInv, key: 'textureTilesInv', wrap: false },
            ],

    },
]
