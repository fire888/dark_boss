import { connect } from 'react-redux'
import { toggleDialog } from '../store/actions'




const mapStateToProps = state => ({
    userReplicies: state.ui.userReplicies,
})




export const UserReplicies = connect(mapStateToProps)(function (props) {
    return (
        <div className="userReplicies">
            {props.userReplicies.map(item => (<button
                    key={Math.floor(Math.random()* 100000)}
                    onClick={() => {
                        toggleDialog(props.dispatch).clickPhrase(item)
                    }}>
                    {window.t(item.q)}
                </button>)
            )}
        </div>
    )
})