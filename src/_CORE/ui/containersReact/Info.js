import { connect } from "react-redux";
import '../stylesheets/Info.css'


const mapStateToProps = (state) => { 
    console.log(state.controls.infoPanelData)
    return {
        ...state.controls.infoPanelData,
    }
}

export default connect(mapStateToProps)(function(props) {
    return ( 
        <div className="info">
            <button
                className="control butt-infoClose"
                onClick={() => props.dispatch({ type: 'TOGGLE_INFO' })}>
                x
            </button>
            <div className="info-inner">
                <p>{props.title}</p>
                <p>{props.topText}</p>
                <p>{props.bottomText}</p>
                <p>{props.afterWolds}</p>
            </div>      
        </div>)
})
/*
(
                <div className="info">
                    <div className="info-inner">

                        <p>
                            {`1 ${window.t('chapter')}: `}
                            <a href="http://js.otrisovano.ru/factory/" target="blank">{ window.t('link') }</a>
                        </p>
                        <p>
                            {`2 ${window.t('chapter')}: `}
                            <a href="http://js.otrisovano.ru/bridge/" target="blank">{ window.t('link') }</a>
                        </p>
                        <p><br /><br />
                            {window.t('Author: ')}
                            <a href="http://otrisovano.ru" target="blank">{ window.t('link') }</a>
                        </p>
                        <p>
                            {window.t('Github: ')}
                            <a href="https://github.com/fire888/levels/" target="blank">{ window.t('link') }</a>
                        </p>
                    </div>
                </div>)}
*/