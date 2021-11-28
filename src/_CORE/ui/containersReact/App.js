import { connect } from 'react-redux'
import PlayerControls from './PlayerControls'

const mapStateToProps = state => ({ 
    isShowControls: state.controls.isShowControls,
})

function App(props) {
    !dispatcher.dispatch && (dispatcher.dispatch = props.dispatch)
    return (
        <div className="ui">
            {<PlayerControls gameContext={props.gameContext} />}
            {props.gameContext.CustomReactComponent && <props.gameContext.CustomReactComponent gameContext={props.gameContext}/>}
        </div>
    )
}


export const dispatcher = { dispatch: null }
export default connect(mapStateToProps)(App);
