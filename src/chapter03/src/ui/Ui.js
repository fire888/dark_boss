import { UI } from '../../../_CORE/ui/UI'
import CustomReactComponent from "./CustomReactComponent";
import { createCustomStore  } from "../store/createStore";

export class Ui {
    constructor(root) {

        root.appWrapper = document.querySelector('.app-wrapper')
        root.CustomReactComponent = CustomReactComponent
        root.customStore = createCustomStore(root)

        const ui = new UI(root)
        root.ui = ui
    }
}