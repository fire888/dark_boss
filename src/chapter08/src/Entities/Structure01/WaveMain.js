import {createMap} from "./createGeneratorWave";
import {createMeshByMap} from "./threeModel";
import {createFloor2} from './createFloor2'
import {createMeshByMap02} from "./threeModel02";

export const createWaveMain = (root) => {
    const map = createMap()
    const m = createMeshByMap(map)
    root.studio.addToScene(m)

    const mapF_02 = createFloor2(map)
    const m2 = createMeshByMap02(mapF_02)
    root.studio.addToScene(m2)
}
