import { UserReplicies } from './UserReplicies'
import { BotAnswers } from './BotAnswers'

import { connect } from 'react-redux'
import { toggleDialog } from '../store/actions'
import PlayerControls from '../../../_CORE/componentsReact/PlayerControls'




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
