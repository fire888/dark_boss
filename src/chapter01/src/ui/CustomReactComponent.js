import { connect } from 'react-redux'
import DialogPallete from "./DialogPallete";

import { dialogChanger } from "../actions/AdderActions";
import './stylesheets/CustomReactComponent.css'
// import { UserReplicies } from './UserReplicies'
// import { BotAnswers } from './BotAnswers'


const mapStateToProps = state => {
    return ({
        isButtonDialog: state.dialogs.isButtonDialog,
        isShowPalleteDialog: state.dialogs.isShowPalleteDialog,
    })
}




function CustomReactComponent(props) {
    return (
        <div className="DialogSystem">
            {props.isButtonDialog && 
                <div className="bottom-button-wrapper">
                  <button 
                      className="dialog-button-toggle" 
                      onClick={() => 
                        dialogChanger(props.dispatch).togglePalleteDialog(true)}
                      style={{ "display": props.display }}>
                      диалог       
                  </button>
                </div>}

            {props.isShowPalleteDialog && <DialogPallete />}

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


/*
  <!-- <div class="ui">
  <div id='info' style="display: none;">
      <button id="close-info" class="control">x</button>
      <div>От</br> <a href='http://otrisovano.ru' target="blanck">www.otrisovano.ru</a></br>
        <a href='https://github.com/fire888/laboratory'>github.com</a></div>
    </div>
    <div class="ui-top">
      <button id="butt-info" class="control">i</button>     
    </div>
    <div class="ui-center">
        <div id="dialog-wrapper">
          <div id="messages-wrapper" style="display: none;">
            <div id="messages"></div>
            <div id="replicies"></div>
          </div>
        </div>
    </div>
    <div class="ui-bottom">
      <div class='left-container'>
        <button class="butt-left control">&#9668;</button>
        <button class="butt-right control">&#9658;</button>
      </div>
      <div class="center-container">
        <button id="dialog-button-toggle" style="display: none;">диалог</button>
      </div>
      <div class='right-container'>
        <button class="butt-front control">&#9650;</button>
      </div>  
    </div>
  </div> -->
  */
