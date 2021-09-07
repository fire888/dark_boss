// import { UserReplicies } from './UserReplicies'
// import { BotAnswers } from './BotAnswers'

import { connect } from 'react-redux'

//import { toggleDialog } from '../store/actions'


const mapStateToProps = state => ({
    //isButtonDialog: state.ui.isButtonDialog,
    //isShowControls: !state.ui.isDialog,
    //isShowFinalMessage: state.ui.isShowFinalMessage,
})




function CustomReactComponent(props) {
    return (
        <div>
            AAAAA
            {/* {props.isButtonDialog && (
                <button
                    className="butt-toggleDialog control"
                    onClick={() => {toggleDialog(props.dispatch).toggleDialog(props.isShowControls)}}>
                    {!props.isShowControls ? window.t('close dialog') : window.t('open dialog') }
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
                        <p>{window.t('To be continued')}</p>
                    </div>
                </div>)} */}
        </div>
    )
}


export default connect(mapStateToProps)(CustomReactComponent);
