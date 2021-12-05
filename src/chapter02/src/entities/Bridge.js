import { createBridgeMesh } from './BridgeMesh'
import gsap from 'gsap'



export function createBridge (material) {
    const setPose = state => {
        currentState = state
        bridge.changeMesh(state)
    }


    const startProgram = program => {
        return new Promise(resolve => {
            doMarathonAnimations(currentState, program, bridge.changeMesh)
                .then(newState => {
                    currentState = newState
                    resolve()
                })
        })
    }


    let currentState = null
    const bridge = createBridgeMesh(material)


    return {
        mesh: bridge.mesh,
        setPose,
        startProgram,
    }
}



const doMarathonAnimations = (currentState, arrStates, action) => {
    return new Promise(resolve => {
        const doNextAnimation = index => {
            const newState = arrStates[index]

            const obj = { val: 0 }

            const onUpdate = () => {
                const middleState = {}
                for (let key in currentState)
                    middleState[key] = currentState[key] + (newState[key] - currentState[key]) * obj.val

                action(middleState)
            }

            const onComplete = () => {
                currentState = newState
                index ++
                arrStates[index] ? doNextAnimation(index) : resolve(currentState)
            }

            gsap.to( obj, { duration: newState.time * 0.001, val: 1, ease: "none", onUpdate, onComplete })
        }

        doNextAnimation(0)
    })
}