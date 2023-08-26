import { LoaderAssets } from '../../../_CORE/helpers/helper_LoadAssets'
import { EventEmitter } from "../../../_CORE/helpers/helper_Emitter"
import { DeviceResizer } from "../../../_CORE/helpers/helper_DeviceResizer"
import { FrameUpdater } from "../../../_CORE/helpers/helper_FrameUpdater_02"
import { Helper_TweenUpdater } from "../../../_CORE/helpers/helper_TweenUpdater"
import { Studio } from '../Entities/Studio'
import { KeyBoard } from "../../../_CORE/helpers/helper_KeyBoard"
import { Player } from '../Entities/player'
import { system_PlayerMoveOnLevel } from '../systems/system_PlayerMoveOnLevel'
import { actions } from './actions'
import { Ui } from "../../../chapter07/src/ui/Ui"
import textureTiles from '../../../assets/chapter08/texture01.jpg'
import textureTilesInv from '../../../assets/chapter07/texture01_inv.jpg'
import { system_Sound } from '../systems/system_Sound'
import soundStepsSrc from '../../../assets/chapter06/audio/steps.mp3'
import soundAmbientSrc from '../../../assets/chapter05/audio/ambient.mp3'
import soundPlatformSrc from '../../../assets/chapter07/platform_loop.mp3'


export async function initPipeline(CONSTANTS) {
    const root = {}
    root.CONSTANTS = CONSTANTS
    root.emitter = new EventEmitter(root)
    root.deviceResizer = new DeviceResizer(root)
    root.loaderAssets = new LoaderAssets(root)
    root.frameUpdater = new FrameUpdater(root)
    root.tweenUpdater = new Helper_TweenUpdater(root)
    root.studio = new Studio(root)
    root.keyBoard = new KeyBoard(root)
    root.player = new Player(root)
    root.system_PlayerMoveOnLevel = new system_PlayerMoveOnLevel(root)
    root.customUi = new Ui(root)
    root.assets = await root.loaderAssets.loadAssets([
        { type: 'img', path: textureTiles, key: 'textureTiles', wrap: false },
        { type: 'img', path: textureTilesInv, key: 'textureTilesInv', wrap: false },
        { type: 'soundMp3', path: soundAmbientSrc, key: 'soundAmbient' },
        { type: 'soundMp3', path: soundStepsSrc, key: 'soundStep' },
        { type: 'soundMp3', path: soundPlatformSrc, key: 'soundPlatform' },
    ])
    root.system_Sound = new system_Sound(root)
    root.actions = new actions(root)
}
