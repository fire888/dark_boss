//import { t } from "../helpers/helper_translate";
import { useState, useEffect } from 'react'
import '../stylesheets/controls.css'




function PlayerControls(props) {
    const [isInfo, changeShowInfo] = useState(false)
    const [isShowFullScreenButt, changeShowFullScreenButt] = useState(true)

    useEffect(() =>
        props.gameContext.emitter.subscribe('screenMode')(val => {
            val === 'exitFullScreen' && changeShowFullScreenButt(true) })
    )


    return (
        <div>

            <button
                className="butt-left control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-left')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-left')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-left')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-left')}
            >
                &#9668;
            </button>


            <button
                className="butt-right control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-right')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-right')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-right')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-right')}
            >
                &#9658;
            </button>


            <button
                className="butt-front control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-front')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-front')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-front')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-front')}
            >
                &#9650;
            </button>

            <button
                className="butt-back control"
                onMouseDown={() => props.gameContext.emitter.emit('mouseDown')('butt-back')}
                onTouchStart={() => props.gameContext.emitter.emit('mouseDown')('butt-back')}
                onMouseUp={() => props.gameContext.emitter.emit('mouseUp')('butt-back')}
                onTouchEnd={() => props.gameContext.emitter.emit('mouseUp')('butt-back')}
            >
                &#x25BC;
            </button>



            {isShowFullScreenButt && (
                <button
                    className="butt-fullscreen control"
                    onClick={() => {
                        props.gameContext.emitter.emit('mouseDown')('butt-fullscreen')
                        changeShowFullScreenButt(false)
                    }}>
                    &#10066;
                </button>)}

            {!isInfo && (
                <button
                    className="butt-info control"
                    onClick={() => changeShowInfo(true)}>
                    i
                </button>)}


            {isInfo && (
                <div className="info">
                    <div className="info-inner">
                        <button
                            className="control butt-infoClose"
                            onClick={() => changeShowInfo(false)}>
                            x
                        </button>
                        <p>
                            {`1 ${t('chapter')}: `}
                            <a href="http://js.otrisovano.ru/factory/" target="blank">{ t('link') }</a>
                        </p>
                        <p>
                            {`2 ${t('chapter')}: `}
                            <a href="http://js.otrisovano.ru/bridge/" target="blank">{ t('link') }</a>
                        </p>
                        <p><br /><br />
                            {t('Author: ')}
                            <a href="http://otrisovano.ru" target="blank">{ t('link') }</a>
                        </p>
                        <p>
                            {t('Github: ')}
                            <a href="https://github.com/fire888/levels/" target="blank">{ t('link') }</a>
                        </p>
                    </div>
                </div>)}
        </div>
    )
}


export default PlayerControls
