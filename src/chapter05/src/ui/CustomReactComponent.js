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
        valButtonDrawCar: state.ui.valButtonDrawCar,
        //isShowButtonToggleOpenLocationsList: state.ui.isShowButtonToggleOpenLocationsList,
        isShowButtonToggleOpenLocationsList: true,//state.ui.isShowButtonToggleOpenLocationsList,
        isLocationListOpened: state.ui.isLocationListOpened,
        currentLocationOfList: state.ui.currentLocationOfList,
        locationsList: state.ui.locationsList,
    })
}



function CustomReactComponent(props) {
    return (
        <>
            {!props.isShowFinalMessage && props.isButtonDialog && !props.isShowPalleteDialog && <button
                className={`control control-enter`}
                onClick={() => props.dispatch({ type: 'TOGGLE_DIALOG', isShowPalleteDialog: true })}>
            </button>}
            
            {(props.isShowPalleteDialog) && (
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
                <button
                    className={`control ${props.valButtonDrawCar === 'exit' ? 'control-exit' : 'control-enter'}`}
                    onClick={() => props.dispatch({ type: 'CLICK_DRAW' })}>
                </button>)}


            {/*{props.isShowButtonToggleOpenLocationsList && !props.isLocationListOpened && <button*/}
            {/*    className="open-locations-car-button"*/}
            {/*    onClick={() => props.dispatch({ type: 'OPEN_LOCATIONS_LIST' })}>*/}
            {/*    {props.currentLocationOfList}*/}
            {/*</button>}*/}


            {/*{props.isLocationListOpened && (*/}
            {/*    <div className='list-locations'>*/}
            {/*        /!*<button*!/*/}
            {/*        /!*    onClick={() => props.dispatch({ type: 'CLOSE_LOCATIONS_LIST' })}>*!/*/}
            {/*        /!*    _x_*!/*/}
            {/*        /!*</button>*!/*/}
            {/*        <div>*/}
            {/*            {props.locationsList.map(item =>*/}
            {/*                (<button*/}
            {/*                    key={Math.floor(Math.random() * 1000000)}*/}
            {/*                    onClick={() => props.dispatch({*/}
            {/*                        type: 'SELECT_LOCATION',*/}
            {/*                        location: item,*/}
            {/*                    })}>*/}
            {/*                    {item}*/}
            {/*                    {props.currentLocationOfList === item && '___v'}*/}
            {/*                </button>))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {props.isShowFinalMessage && (
                    <div className='final-mess'>{t('To be continued')}</div>
                )}
        </>
    )
}


export default connect(mapStateToProps)(CustomReactComponent);


