import { connect } from 'react-redux'
import { toggleDialog } from '../store/actions'
import { t } from '../../_CORE/helpers/helper_translate'



const mapStateToProps = state => ({
    userReplicies: state.app.ui.userReplicies,
})




export const UserReplicies = connect(mapStateToProps)(function (props) {
    return (
        <div className="userReplicies">
            {props.userReplicies.map(item => (<button
                    key={Math.floor(Math.random()* 100000)}
                    onClick={() => {
                        toggleDialog(props.dispatch).clickPhrase(item)
                    }}>
                    {t(item.q)}
                </button>)
            )}
        </div>
    )
})