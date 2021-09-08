/** 
 * Small scenarious to change one prop of object 
 */

 
import { timer, tween } from "./funcs/transformProp";
import { start } from "../utils/iterate";


export function animateToOffsetAndReturn (
    { prop, key, fromVal, offset, time = 1000, pause = 2000 },
    onAllComplete = () => {},
) {
    const
        animateToOffset = [tween, [prop, key, fromVal, fromVal + offset, time]], 
        wait = [timer, [pause]],
        animateFromOffsetToStart = [tween, [prop, key, fromVal + offset, fromVal, time]],
        onComplete = [onAllComplete, []]

    start([
        animateToOffset, 
        wait, 
        animateFromOffsetToStart, 
        onComplete,
    ])
}

