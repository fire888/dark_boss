import { connect } from 'react-redux'




const mapStateToProps = state => ({
    botAnswers: state.ui.botAnswers,
})




export const BotAnswers = connect(mapStateToProps)(function (props) {
    return (
        <div className="botAnswers">
            {props.botAnswers.map(item => (<div key={Math.floor(Math.random() * 100000)}>
                    <div className="q">{window.t(item.q)}</div>
                    <div className="a">{window.t(item.a)}</div>
                </div>)
            )}
        </div>
    )
})