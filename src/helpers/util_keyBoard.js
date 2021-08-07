
export class KeyBoard {
    constructor (gameContext) {
        const { emitter } = gameContext

        const keys = {
            'up': false,
            'left': false,
            'right': false,
            's': false,
            'm': false,
            'w': false,
        }


        const keyUpdate = function ( keyCode, isDown ) {
            switch( keyCode ) {
                case 38:
                    keys['up'] = isDown
                    break
                case 37:
                    keys['left'] = isDown
                    break
                case 39:
                    keys['right'] = isDown
                    break
                case 83:
                    keys['s'] = isDown
                    break
                case 77:
                    keys['m'] = isDown
                    break
                case 87:
                    keys['w'] = isDown
                    break
            }
            emitter.emit('keyEvent')(keys)
        }



        document.addEventListener('keydown', event => keyUpdate(event.keyCode, true))
        document.addEventListener('keyup', event => keyUpdate(event.keyCode, false))



        emitter.subscribe('mouseDown')(key => {
            if (key === 'butt-left') keyUpdate(37, true)
            if (key === 'butt-right') keyUpdate(39, true)
            if (key === 'butt-front') keyUpdate(38, true)
        })
        emitter.subscribe('mouseUp')(key => {
            if (key === 'butt-left') keyUpdate(37, false)
            if (key === 'butt-right') keyUpdate(39, false)
            if (key === 'butt-front') keyUpdate(38, false)
        })
    }
}

