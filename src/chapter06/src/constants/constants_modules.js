import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpdater_02"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../Entities/Studio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../../../_CORE/entities/createPlayer_v02'


import { Helper_MaterialsLib } from '../../../_CORE/helpers/helper_MaterialsLib'
import mapTop from '../../../assets/chapter06/mapGround.jpg'
import bodyShadow from '../../../assets/chapter06/mapShadowBody.jpg'
import pxjpg2 from '../../../assets/matIronBox/posx.jpg'
import nxjpg2 from '../../../assets/matIronBox/negx.jpg'
import pyjpg2 from '../../../assets/matIronBox/posy.jpg'
import nyjpg2 from '../../../assets/matIronBox/negy.jpg'
import pzjpg2 from '../../../assets/matIronBox/posz.jpg'
import nzjpg2 from '../../../assets/matIronBox/negz.jpg'


import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel'
import { system_PlayerNearLevelItems } from '../systems/system_PlayerNearLevelItems'


import { actions } from '../actions/actions'
import { Ui } from "../ui/Ui";


import ironNormal from '../../../assets/chapter06/concrete/broken_down_concrete2_Normal-dx.jpg'
import ironAO from '../../../assets/chapter06/concrete/broken_down_concrete2_ao.jpg'
import ironAlbedo from '../../../assets/chapter06/concrete/broken_down_concrete2_albedo.jpg'

import bodySrc from '../../../assets/chapter06/body.obj'
import endWaySrc from '../../../assets/chapter06/endWay.obj'

import flareSrc from '../../../assets/chapter06/flare.png'



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
        key: 'system_PlayerMoveOnLevel',
        constr: system_PlayerMoveOnLevel,
        initStateKey: 'beforeStartPlay',
    },
    // {
    //     key: 'system_Sound',
    //     constr: system_Sound,
    //     initStateKey: 'beforeStartPlay',
    //     assetsToLoad: [
    //         { type: 'soundMp3', path: soundAmbientSrc, key: 'soundAmbient' },
    //         //{ type: 'soundMp3', path: carStart, key: 'carStart' },
    //         //{ type: 'soundMp3', path: carLoop, key: 'carLoop' },
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
            assetsToLoad: [
                { type: 'cubeTextures', path: [ pxjpg2, nxjpg2, pyjpg2, nyjpg2, pzjpg2, nzjpg2, ], key: 'skyBox3' },
                { type: 'img', path: mapTop, key: 'mapTop', wrap: true },
                { type: 'img', path: ironNormal, key: 'ironNormal', wrap: true },
                { type: 'img', path: ironAlbedo, key: 'ironAlbedo', wrap: true },
                { type: 'img', path: ironAO, key: 'ironAO', wrap: true },
                { type: 'obj', path: bodySrc, key: 'bodyModel' },
                { type: 'img', path: bodyShadow, key: 'bodyDropShadow' },
                { type: 'obj', path: endWaySrc, key: 'endWayModel' },
                { type: 'img', path: bodyShadow, key: 'flareSrc' },
            ],

    },
]