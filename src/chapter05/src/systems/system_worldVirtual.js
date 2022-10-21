import { createCheckerChangeLocationKey } from '../components/checkerChangeLocationKey'
import { createChangerGalleries } from './system_changerGallery'
import { createLevelArea } from './system_levelArea'
import { createSustemSprites } from './sustem_sprites'
import { createMeshUnit } from '../Entities/Pers'
import { SIZE_QUADRANT, LOCATIONS_QUADRANTS } from "../constants/constants_elements";

export const createSystemWorldVirtual = (root, carX, carZ) => {
    const checkerChangeLocation = createCheckerChangeLocationKey(SIZE_QUADRANT, carX, carZ)
    const changerLocations = createChangerGalleries(root)
    const changerLevelArea = createLevelArea(root)
    const systemSprites = createSustemSprites(root)
    const unit = createMeshUnit(root)
    root.unit = unit

    let isEnabled = false

    return {
        addWorld: () => {
            let currentQuadrantKey = checkerChangeLocation.getCurrent()
            changerLevelArea.createArea(currentQuadrantKey.currentEnv)
            systemSprites.addToScene()
            isEnabled = true
        },
        removeWorld: () => {
            isEnabled = false
            /** TODO: add removeFromScene */
        },
        update: (carX, carZ) => {
            if (!isEnabled) {
                return;
            }

            unit.update()
            systemSprites.update()
            const l = checkerChangeLocation.checkChanged(carX, carZ)
            if (l) {
                console.log('quadrants data', l)
                /** arr/remove level tresh **********************/
                changerLevelArea.updateAreas(l.removedQs, l.addedQs)

                /** add/remove  locations ************************/
                if (LOCATIONS_QUADRANTS[l.oldKey]) {
                    //console.log('remove', l.oldKey)
                    changerLocations.removeLocationFromScene(LOCATIONS_QUADRANTS[l.oldKey])
                }
                if (LOCATIONS_QUADRANTS[l.newKey]) {
                    //console.log('add', l.newKey)
                    const strArr = l.newKey.split('_')
                    const locationX = +strArr[0] * SIZE_QUADRANT + SIZE_QUADRANT / 2
                    const locationZ = +strArr[1] * SIZE_QUADRANT + SIZE_QUADRANT / 2
                    changerLocations.addLocationToScene(LOCATIONS_QUADRANTS[l.newKey], locationX, locationZ)
                }

            }
        }
    }
}