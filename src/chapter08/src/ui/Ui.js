import { UI } from '../../../_CORE/ui/UI'
import CustomReactComponent from "./CustomReactComponent";
import { createCustomStore  } from "./store";

export class Ui {
    constructor(root) {
        root.appWrapper = document.querySelector('.app-wrapper')
        root.CustomReactComponent = CustomReactComponent
        root.customStore = createCustomStore(root)

        const buttonMouse = document.createElement('button')
        buttonMouse.style.display = 'none'
        buttonMouse.classList.add('button-mouse')
        buttonMouse.classList.add('control-small')
        const parent = document.querySelector('.app-wrapper') 
        parent.appendChild(buttonMouse)

        root.buttonMouse = buttonMouse
        buttonMouse.addEventListener('click', () => {
            buttonMouse.style.display = 'none'
            root.emitter.emit('clickButtonMouse')() 
        })
        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement === document.body) {
            } else {
                buttonMouse.style.display = 'block'
            }
        })

        const ui = new UI(root)
        root.ui = ui
    }
}