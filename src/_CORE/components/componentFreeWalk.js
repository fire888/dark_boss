export function componentFreeWalk (mesh, meshFrontObj, wallOffset, root) {
    const { systemCollisionItems } = root

    const actions = {
        'rotate': startRotate,
        'go': startGo,
    }

    let state = 'rotate' // || 'go'
    let currentAction = null

    const toggleAction = key => {
        if (!key) {
            state === 'rotate' && (key = 'go')
            state === 'go' && (key = 'rotate')
        }

        state = key
        currentAction = actions[key](mesh)      
    }


    toggleAction(state)


    return {
        update: () => {
            if (state === 'go') {    
                const [ isBlockedByItem ] = systemCollisionItems.checkCollisions(mesh, meshFrontObj, wallOffset)

                isBlockedByItem && toggleAction('rotate')
            }

            !currentAction() && toggleAction()       
        }, 
    }
}



const ran = Math.random

const startRotate = mesh => {
    const angleRot = (ran() * Math.PI * 1.5 + 1) * ran() < 0.5 ? 1 : -1
    const numRotations = 40
    const speed = angleRot / numRotations

    let countRotation = 0

    return () => {
        mesh.rotation.y += speed
        return ++countRotation < numRotations  
    }
}



const startGo = mesh => {
    const numsMove = ran() * 300

    let countMove = 0 

    return () => {
        mesh.translateZ(0.11)
        return ++countMove < numsMove
    }
}
