import { connect } from 'react-redux'
import PlayerControls from './PlayerControls'

const mapStateToProps = state => ({ 
    isShowControls: state.controls.isShowControls,
    isInfo: state.controls.isInfo,
})

function App(props) {
    !dispatcher.dispatch && (dispatcher.dispatch = props.dispatch)
    return (
        <div className="ui">
            {!props.isInfo && props.gameContext.CustomReactComponent && <props.gameContext.CustomReactComponent gameContext={props.gameContext}/>}
            {<PlayerControls gameContext={props.gameContext} />}
        </div>
    )
}


export const dispatcher = { dispatch: null }
export default connect(mapStateToProps)(App);
