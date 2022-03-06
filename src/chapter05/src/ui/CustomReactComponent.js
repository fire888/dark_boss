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
        isShowPalleteDialog: state.ui.isShowPalleteDialog,
        isShowButtonDrawCar: state.ui.isShowButtonDrawCar,
        valButtonDrawCar:  state.ui.valButtonDrawCar,
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

            {props.isShowButtonDrawCar && (
                <div className="dialog-wrapper">
                    <div className="dialog-content">
                        <button
                            className="draw-car-button"
                            onClick={() => props.dispatch({ type: 'CLICK_DRAW' })}>
                            {t(props.valButtonDrawCar)}
                        </button>
                    </div>
                </div>)}

            {props.isShowFinalMessage && (
                    <div className='final-mess'>{t('To be continued')}</div>
                )}
        </>
    )
}


export default connect(mapStateToProps)(CustomReactComponent);
