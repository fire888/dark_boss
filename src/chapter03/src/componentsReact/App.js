import { UserReplicies } from './UserReplicies'
import { BotAnswers } from './BotAnswers'

import { connect } from 'react-redux'
import { toggleDialog } from '../store/actions'
//import { t } from '../../../_CORE/helpers/helper_translate'
import PlayerControls from '../../../_CORE/componentsReact/PlayerControls'




const mapStateToProps = state => ({
    isButtonDialog: state.app.ui.isButtonDialog,
    isShowControls: !state.app.ui.isDialog,
    isShowClickFullScreen: state.app.ui.isShowButtFullScreen,
    isShowInfo: state.app.ui.isShowInfo,
    isShowFinalMessage: state.app.ui.isShowFinalMessage,
})




function App(props) {
    !dispatcher.dispatch && (dispatcher.dispatch = props.dispatch)



    return (
        <div className="ui">
            {props.isShowControls && <PlayerControls gameContext={props.gameContext} />}

            {props.isButtonDialog && (
                <button
                    className="butt-toggleDialog control"
                    onClick={() => {toggleDialog(props.dispatch).toggleDialog(props.isShowControls)}}>
                    {!props.isShowControls ? t('close dialog') : t('open dialog') }
                </button>)}


            {!props.isShowControls && (
                <div className="dialog">
                    <div className="dialog-inner">
                        <BotAnswers />
                        <UserReplicies />
                    </div>
                </div>)}


            {props.isShowFinalMessage && (
                <div className="info">
                    <div className="info-inner final-message">
                        <p>{t('To be continued')}</p>
                    </div>
                </div>)}
        </div>
    )
}



export const dispatcher = { dispatch: null }

export default connect(mapStateToProps)(App);
