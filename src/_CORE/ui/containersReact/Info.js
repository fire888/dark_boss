import { connect } from "react-redux";
import '../stylesheets/Info.css'
import { createTranslater } from '../../helpers/helper_translate'
import { INFO_VOC } from '../../constants/default_voc'


const t = createTranslater(INFO_VOC)

const mapStateToProps = (state) => {
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
                <p>{t(props.title)}</p>
                <p>{t(props.topText)}</p>
                <ul>{props.chapters.map((item, index) => 
                    <li key={index}>
                        {index + 1}.&nbsp;
                        {item.href 
                            ? <span><a href={item.href} target="blank">{t(item.text)}</a></span>
                            : <span>{t(item.text)}</span>}
                        {index === props.currentChapterIndex && t(' (current)')}
                    </li>)
                }</ul>
                <p>{props.bottomText}</p>
                <ul>{props.afterWords.map((item, index) => 
                    <li key={index}>
                        {t(item.text)} 
                        <a href={item.href} target="blank">{t(item.aText)}</a>
                    </li>)
                }</ul>
            </div>      
        </div>)
})

