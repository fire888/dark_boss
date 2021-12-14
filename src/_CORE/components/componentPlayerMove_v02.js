export const createComponentPlayerMove = (player, root) => {

    const { emitter, studio, CONSTANTS } = root

    const {
        startPos,
        startRot,
        cameraData,
        frontObjPos,
        backObjPos,
        lightDataOne,
        speed,
        offsetFromFloor,
        offsetFromFloorFactor,
        offsetWallCollision,
        speedDown,
        speedRot,
    } = CONSTANTS.playerConfig


        let keys = {}
        let isButtonsDisabled = false
        const isCanMove = {
            'up': true,
            'down': true,
        }


        const update = data => {
        if (isButtonsDisabled) return;

        keys['left'] && (player._mainObj.rotation.y += (speedRot * data.count))
        keys['right'] && (player._mainObj.rotation.y -= (speedRot * data.count))


        if (player._isBlocked) return;

        /** check bottom floors */
        if (root.systemCollisionFloor) {
            const [
                isBlockedByItem, 
                offset,
                point, 
            ] = root.systemCollisionFloor.checkCollisions(player._mainObj, player.bottomObj, offsetFromFloor)
            
            if (!isBlockedByItem) {
                 player._mainObj.position.y += speedDown
            } else {
                if (offset < (offsetFromFloor - offsetFromFloorFactor))  {
                    player._mainObj.position.y = point.y + offsetFromFloor
                }                        
            }
        }


        if (!keys) return;

        if (keys['up']) {
            if (!isCanMove['up']) return;

            if (root.systemCollisionItems) {
                const [ isBlockedByItem ] 
                    = root.systemCollisionItems.checkCollisions(player._mainObj, player.frontObj, offsetWallCollision)
                
                    

                if (isBlockedByItem) return;
            }

            player._mainObj.translateZ(-speed * data.count)
            emitter.emit('playerMove')({ pos: player._mainObj.position, dir: 'up' })
        }

        if (keys['down']) {
            if (!isCanMove['down']) return;

            if (root.systemCollisionItems) {
                const [ isBlockedByItem ] 
                    = root.systemCollisionItems.checkCollisions(player._mainObj, player.backObj, offsetWallCollision)
                if (isBlockedByItem) return;
            }

            player._mainObj.translateZ(speed * data.count)
            emitter.emit('playerMove')({ pos: player._mainObj.position, dir: 'down' })
        }
    }


    emitter.subscribe('keyEvent')(data => keys = data)
    emitter.subscribe('frameUpdate')(update)
    emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)
} 