import './CustomReactComponent.css'
import { createTranslater } from '../../../_CORE/helpers/helper_translate'
import { UserReplicies } from './UserReplicies'
import { BotAnswers } from './BotAnswers'
import { TRANSLATE_WORLDS } from '../constants/constants_replicies'

import { connect } from 'react-redux'


const t = createTranslater(TRANSLATE_WORLDS)

const mapStateToProps = state => {
    return ({
        isButtonDialog: state.ui.isButtonDialog,
        isShowFinalMessage: state.ui.isShowFinalMessage,
        isShowPalleteDialog: state.ui.isShowPalleteDialog
    })
}




function CustomReactComponent(props) {

    return (
        <>
            {(!props.isShowFinalMessage && props.isButtonDialog || props.isShowPalleteDialog) && (
                <div className="dialog-wrapper">
                    <div className="dialog-content">

                        {props.isShowPalleteDialog && <div className='messages-wrapper'>
                            <BotAnswers />
                            <UserReplicies />
                        </div>}

                        {props.isButtonDialog && <button
                            className="dialog-button-toggle"
                            onClick={() => props.dispatch({ type: 'TOGGLE_DIALOG', isShowPalleteDialog: !props.isShowPalleteDialog })}>
                            {props.isShowPalleteDialog ? t('close dialog') : t('open dialog') }
                        </button>}
                    </div>
                </div>)}



            {props.isShowFinalMessage && (
                <div className='final-mess'>
                        <button
                            onClick={() => {
                                window.location.replace('./../05')
                            }}>
                            {t('Continue')}
                        </button>
                </div>
            )}
        </>
    )
}


export default connect(mapStateToProps)(CustomReactComponent);
