import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Info from './Info'
import '../stylesheets/PlayerControls.css'





export default connect(
    state => ({
            isInfo: state.controls.isInfo,
            isShowControls: state.controls.isShowControls, 
            isShowControlSound: state.controls.isShowControlSound,
            isMute: state.controls.isMute,
    })
)(
    function(props) {
    const [isShowFullScreenButt, changeShowFullScreenButt] = useState(true)

    useEffect(() =>
        props.gameContext.emitter.subscribe('screenMode')(val => {
            val === 'exitFullScreen' && changeShowFullScreenButt(true) })
    )


    return (
        <div className='ui-controls'>
            {props.isShowControls && props.isShowControlSound && <button
                className={`${props.isMute ? 'butt-sound-n' : 'butt-sound' } control-small`}
                onMouseUp={() => { 
                    props.gameContext.emitter.emit('toggleSound')(!props.isMute) 
                    props.dispatch({ type: 'TOGGLE_MUTE', is: !props.isMute })
                }}
                onTouchEnd={() => { 
                    props.gameContext.emitter.emit('toggleSound')(!props.isMute) 
                    props.dispatch({ type: 'TOGGLE_MUTE', is: !props.isMute })
                }}
            >
            </button>}

            {props.isShowControls && <button
                className="butt-left control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-left')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-left')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-left')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-left')}
            >
            </button>}


            {props.isShowControls && <button
                className="butt-right control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-right')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-right')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-right')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-right')}
            >
            </button>}


            {props.isShowControls && <button
                className="butt-front control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-front')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-front')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-front')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-front')}
            >
            </button>}

            {props.isShowControls && <button
                className="butt-back control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-back')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-back')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-back')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-back')}
            >
            </button>}



            {/* {props.isShowControls && isShowFullScreenButt && (
                <button
                    className="butt-fullscreen control-small"
                    onClick={() => {
                        props.gameContext.emitter.emit('mouseDown')('butt-fullscreen')
                        changeShowFullScreenButt(false)
                    }}>
                </button>)}

            {!props.isInfo && (
                <button
                    className="butt-info control-small"
                    onClick={() => props.dispatch({ type: 'TOGGLE_INFO' })}>
                </button>)} */}


            {props.isInfo && <Info />}
        </div>
    )
})

