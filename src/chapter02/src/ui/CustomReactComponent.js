import { connect } from 'react-redux'
import DialogPallete from "./DialogPallete"
import './stylesheets/CustomReactComponent.css'
import { VOC } from '../constants/translate'
import { toggleOpenDialog } from "../actions/AdderActions";

import { createTranslater } from "../../../_CORE/helpers/helper_translate";
const t = createTranslater(VOC)



const mapStateToProps = state => {
    return ({
        isButtonDialog: state.dialogs.isButtonDialog,
        isCloseisButtonDialog: state.dialogs.isCloseisButtonDialog,
        isShowPalleteDialog: state.dialogs.isShowPalleteDialog,
    })
}



function CustomReactComponent(props) {
    if (!(props.isButtonDialog || props.isShowPalleteDialog)) { 
      return <div></div>
    }

    return (
      <div className="dialog-wrapper">
          <div className="dialog-content">           
            {props.isShowPalleteDialog && <DialogPallete />}
            {(props.isButtonDialog || props.isShowPalleteDialog) && 
                  <button 
                      className="dialog-button-toggle" 
                      onClick={() =>
                          toggleOpenDialog(
                              props.dispatch,
                              (props.isButtonDialog && true) || (props.isShowPalleteDialog && false))
                      }
                      style={{ "display": props.display }}>
                      {
                        (props.isButtonDialog && t('open')) ||
                        (props.isShowPalleteDialog && t('close'))
                      }       
                  </button>}
           </div>     
        </div>
    )
}


export default connect(mapStateToProps)(CustomReactComponent)