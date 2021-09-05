/**
 * Functions call callback after execution
 */


export const timer = (t, on) => setTimeout(on, t)
export const tween = (prop, key, fromVal, toVal, time, callback) => {
    const timerStep = 16.666
    const count = time / timerStep
    const speed = (toVal - fromVal) / count

    let currentCount = 0

    const step = () => {
        ++currentCount

        if (currentCount > count) {
            prop[key] = toVal
            return void callback()
        }

        prop[key] += speed
        setTimeout(step, timerStep)
    }
    step()
}