export function animateMoveAndReturn (
    { position, keyPos, fromVal, offset, time = 1000, pause = 2000 },
    callback = () => {}
) {
    const moveTop = on => () => move(position, keyPos, fromVal, fromVal + offset, time, on)
    const wait = on => () => setTimeout(on, pause)
    const moveBottom = on => () => move(position, keyPos, fromVal + offset, fromVal, time, on)
    const onComplete = () => callback

    start([ moveTop, wait, moveBottom, onComplete ])
}



const move = (pos, keyPos, fromVal, toVal, time, callback) => {
    const timerStep = 16.666
    const count = time / timerStep
    const speed = (toVal - fromVal) / count

    let currentCount = 0

    const step = () => {
        ++currentCount

        if (currentCount > count) {
            pos[keyPos] = toVal
            return void callback()
        }

        pos[keyPos] += speed
        setTimeout(step, timerStep)
    }
    step()
}



const start = arr => {
    const iterate = i => arr[i] && arr[i](() => iterate(++i))()
    iterate(0)
}