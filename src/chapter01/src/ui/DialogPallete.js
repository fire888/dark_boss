import React from 'react'
import { connect } from 'react-redux'
import { dialogChanger } from "../actions/AdderActions";


export default connect(
    state => { 
        return ({
        replicies: state.dialogs.replicies,
        currentBotKey: state.dialogs.currentBotKey, 
    }) }
)(
    function (props) {

        const { messages } = props.replicies[props.currentBotKey]

        const arrM = messages.map((item, ind)=> {
            if (!item.isDone) return <div key={ind}></div>

            return (
                <div key={ind}>
                    <p className='player'>{item.player}</p>
                    <p>{item.nps}</p>
                </div>)
        })


        const arrR = messages.map((item, ind)=> {
            if (item.isDone) return <div key={ind}></div>

            return (
                <button
                    key={ind}
                    onClick={()=>
                        dialogChanger(props.dispatch)
                            .clickOnPlayerPhrase(props.currentBotKey, ind)}>
                    {item.player}
                </button>)
        })


        return (
            <div className="dialog-wrapper">
                <div className="messages-wrapper">
                    <div className="messages">
                        {arrM}
                    </div>
                    <div className="replicies">
                        {arrR}
                    </div>
                </div>
            </div>    
        )
    }
)