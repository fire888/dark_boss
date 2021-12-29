
export class KeyBoard {
    constructor (gameContext) {
        const { emitter } = gameContext

        const keys = {
            'up': false,
            'down': false,
            'left': false,
            'right': false,
            'p': false,
        }

        const keysEnabled = {
            'up': true,
            'down': true,
            'left': true,
            'right': true,
        }

        this.keysEnabled = keysEnabled
        this.keys = keys


        const keyUpdate = function ( keyCode, isDown ) {
            switch( keyCode ) {
                case 38:
                case 87:
                    keysEnabled['up'] && (keys['up'] = isDown)
                    break;
                case 40:
                case 83:
                    keysEnabled['down'] && (keys['down'] = isDown)
                    break;
                case 37:
                case 65:
                    keys['left'] = isDown
                    break;
                case 39:
                case 68:
                    keys['right'] = isDown
                    break
                case 80: 
                    keys['p'] = isDown
                default:
                    break;

            }
            emitter.emit('keyEvent')(keys)
        }



        document.addEventListener('keydown', event => keyUpdate(event.keyCode, true))
        document.addEventListener('keyup', event => keyUpdate(event.keyCode, false))



        emitter.subscribe('mouseDown')(key => {
            if (key === 'butt-left') keyUpdate(37, true)
            if (key === 'butt-right') keyUpdate(39, true)
            if (key === 'butt-front') keyUpdate(38, true)
            if (key === 'butt-back') keyUpdate(40, true)
        })
        emitter.subscribe('mouseUp')(key => {
            if (key === 'butt-left') keyUpdate(37, false)
            if (key === 'butt-right') keyUpdate(39, false)
            if (key === 'butt-front') keyUpdate(38, false)
            if (key === 'butt-back') keyUpdate(40, false)
        })
    }

    toggleEnableKeys (key, is) {
        this.keysEnabled[key] = is
        !is && (this.keys[key] = false)
    }
}

