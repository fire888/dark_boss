import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Info from './Info'
import '../stylesheets/PlayerControls.css'





export default connect(
    state => ({
            isInfo: state.controls.isInfo,
            isShowControls: state.controls.isShowControls, 
    })
)(
    function(props) {
        console.log(props)
    //const [isInfo, changeShowInfo] = useState(false)
    const [isShowFullScreenButt, changeShowFullScreenButt] = useState(true)

    useEffect(() =>
        props.gameContext.emitter.subscribe('screenMode')(val => {
            val === 'exitFullScreen' && changeShowFullScreenButt(true) })
    )


    return (
        <div className='ui-controls'>

            {props.isShowControls && <button
                className="butt-left control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-left')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-left')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-left')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-left')}
            >
                &#9668;
            </button>}


            {props.isShowControls && <button
                className="butt-right control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-right')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-right')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-right')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-right')}
            >
                &#9658;
            </button>}


            {props.isShowControls && <button
                className="butt-front control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-front')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-front')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-front')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-front')}
            >
                &#9650;
            </button>}

            {props.isShowControls && <button
                className="butt-back control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-back')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-back')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-back')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-back')}
            >
                &#x25BC;
            </button>}



            {props.isShowControls && isShowFullScreenButt && (
                <button
                    className="butt-fullscreen control"
                    onClick={() => {
                        props.gameContext.emitter.emit('mouseDown')('butt-fullscreen')
                        changeShowFullScreenButt(false)
                    }}>
                    &#10066;
                </button>)}

            {!props.isInfo && (
                <button
                    className="butt-info control"
                    onClick={() => props.dispatch({ type: 'TOGGLE_INFO' })}>
                    i
                </button>)}


            {props.isInfo && <Info />}
        </div>
    )
})

