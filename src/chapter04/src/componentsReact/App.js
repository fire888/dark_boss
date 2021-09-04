import { connect } from 'react-redux'
import PlayerControls from '../../../_CORE/componentsReact/PlayerControls'
import '../../../_CORE/stylesheets/controls.css'



const mapStateToProps = state => ({})




function App(props) {
    return (
        <div className="ui">
            <PlayerControls gameContext={props.gameContext} />
        </div>
    )
}



export const dispatcher = { dispatch: null }

export default connect(mapStateToProps)(App);
