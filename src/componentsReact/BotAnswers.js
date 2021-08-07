import { connect } from 'react-redux'
import { t } from '../helpers/util_translate'




const mapStateToProps = state => ({
    botAnswers: state.app.ui.botAnswers,
})




export const BotAnswers = connect(mapStateToProps)(function (props) {
    return (
        <div className="botAnswers">
            {props.botAnswers.map(item => (<div key={Math.floor(Math.random() * 100000)}>
                    <div className="q">{t(item.q)}</div>
                    <div className="a">{t(item.a)}</div>
                </div>)
            )}
        </div>
    )
})