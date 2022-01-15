import { connect } from 'react-redux'
import { TRANSLATE_WORLDS} from "../constants/constants_replicies";
import { createTranslater } from "../../../_CORE";



const t = createTranslater(TRANSLATE_WORLDS)




const mapStateToProps = state => ({
    botAnswers: state.ui.botAnswers,
})




export const BotAnswers = connect(mapStateToProps)(function (props) {
    return (
        <div className="messages">
            {props.botAnswers.map(item => (<div key={Math.floor(Math.random() * 100000)}>
                    <div className="q">{t(item.q)}</div>
                    <div className="a">{t(item.a)}</div>
                </div>)
            )}
        </div>
    )
})