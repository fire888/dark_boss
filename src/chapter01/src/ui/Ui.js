import "./stylesheets/style.css";
import { UI } from '../../../_CORE/ui/UI'
import CustomReactComponent from "./CustomReactComponent";
import { dialogs } from "./createStore";

export class CustomUi {
    constructor(root) {

        root.appWrapper = document.querySelector('.app-wrapper')
        root.CustomReactComponent = CustomReactComponent
        root.customStore = { dialogs }

        root.ui = new UI(root)
    } 
} 












