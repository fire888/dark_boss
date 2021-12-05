import React from 'react'
import { connect } from 'react-redux'
import { TRANSLATE_WORLDS } from "../constants/constants_replicies";
import * as LIBA from '../../../_CORE/'
const t = LIBA.createTranslater(TRANSLATE_WORLDS)


export default connect(
    state => { 
        console.log(state.dialogs.currentTerminalKey)
        console.log(state.dialogs.currentPhraseIndex)
        return ({
            replicies: state.dialogs.replicies,
            blockPhrases: state.dialogs.replicies[state.dialogs.currentTerminalKey][state.dialogs.currentPhraseIndex],
            currentTerminalKey: state.dialogs.currentTerminalKey,
            currentPhraseIndex: state.dialogs.currentPhraseIndex,
    }) }
)(
    function (props) {
        const message = t(props.blockPhrases.q.txt)
        const filteredAnswers = props.blockPhrases.a.filter(item => item.isShow)
        const replicies = filteredAnswers.map((item, ind) =>
                <button
                    key={ind}
                    onClick={()=>props.dispatch({
                        type: 'CLICK_ON_PLAYER_PHRASE',
                        currentTerminalKey: props.currentTerminalKey,
                        actionKey: item.action,
                        dataAction: item.dataAction || null, 
                        phraseIndex: ind, })
                    }>
                    {t(item.txt)}
                </button>)

        // const arrM = messages.map((item, ind)=> {
        //     if (!item.isDone) return <div key={ind}></div>
        //
        //     return (
        //         <div
        //             key={ind}
        //             className='marTop-small'>
        //             <p className='player'>{t(item.player)}</p>
        //             <p>{t(item.nps)}</p>
        //         </div>)
        // })
        //
        //
        // const arrR = messages.map((item, ind)=> {
        //     if (item.isDone) return <div key={ind}></div>
        //
        //     return (
        //         <button
        //             key={ind}
        //             onClick={()=>props.dispatch({ type: 'CLICK_ON_PLAYER_PHRASE', currentBotKey: props.currentBotKey, phraseIndex: ind, })}>
        //             {t(item.player)}
        //         </button>)
        // })


        return (
                <div className="messages-wrapper">
                    <div className="messages">
                        {message}
                    </div>
                    <div className="replicies">
                        {replicies}
                    </div>
                </div>
        )
    }
)