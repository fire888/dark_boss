import { UI } from '../../../_CORE/ui/UI'
import CustomReactComponent from "./CustomReactComponent";
import { createCustomStore  } from "./createStore";

export class CustomUi {
    constructor(root) {

        root.appWrapper = document.querySelector('.app-wrapper')
        root.CustomReactComponent = CustomReactComponent
        root.customStore = createCustomStore(root)

        root.ui = new UI(root)
    } 
} 












