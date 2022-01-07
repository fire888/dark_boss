import { connect } from 'react-redux'
import { toggleDialog } from '../store/actions'
import { TRANSLATE_WORLDS } from '../constants/constants_replicies'
import * as CORE from "../../../_CORE";

const t = CORE.createTranslater(TRANSLATE_WORLDS)




const mapStateToProps = state => ({
    userReplicies: state.ui.userReplicies,
})




export const UserReplicies = connect(mapStateToProps)(function (props) {
    return (
        <div className="replicies">
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