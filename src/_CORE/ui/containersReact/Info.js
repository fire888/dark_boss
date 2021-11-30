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
                <ul>{props.chapters.map((item, index) => 
                    <li key={index}>
                        {index + 1}.&nbsp;
                        {item.href 
                            ? <span><a href={item.href} target="blank">{item.text}</a></span>
                            : <span>{item.text}</span>}
                        {index === props.currentChapterIndex && ' (current)'}
                    </li>)
                }</ul>
                <p>{props.bottomText}</p>
                <ul>{props.afterWords.map((item, index) => 
                    <li key={index}>
                        {item.text} 
                        <a href={item.href} target="blank">{item.aText}</a>
                    </li>)
                }</ul>
            </div>      
        </div>)
})

