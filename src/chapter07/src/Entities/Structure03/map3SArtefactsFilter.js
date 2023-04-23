const isConnect = (tileData, key) => {
    return tileData[key].includes('1')
}






export const map3SArtifactsFilter = (map) => {

    const checkNextInBranch = (i, j, k, srcDir) => {
        if (!map.items[i] || !map.items[i][j] || !map.items[i][j][k] || !map.items[i][j][k].tileData) {
            return;
        }

        if (map.items[i][j][k].noArtifactsChecked) {
            return;
        }
        const item = map.items[i][j][k]
        item.noArtifactsChecked = true

        if (srcDir !== 'nY' && isConnect(item.tileData, 'nY')) {
            checkNextInBranch(i - 1, j, k, 'pY')
        }

        if (srcDir !== 'pY' && isConnect(item.tileData, 'pY')) {
            checkNextInBranch(i + 1, j, k, 'nY')
        }

        if (srcDir !== 'nZ' && isConnect(item.tileData, 'nZ')) {
            checkNextInBranch(i, j - 1, k, 'pZ')
        }

        if (srcDir !== 'pZ' && isConnect(item.tileData, 'pZ')) {
            checkNextInBranch(i, j + 1, k, 'nZ')
        }

        if (srcDir !== 'nX' && isConnect(item.tileData, 'nX')) {
            checkNextInBranch(i, j, k - 1, 'pX')
        }

        if (srcDir !== 'pX' && isConnect(item.tileData, 'pX')) {
            checkNextInBranch(i, j, k + 1, 'nX')
        }
    }



    map.iterateAll(item => {
        if (item.noArtifactsChecked) {
            return;
        }
        if (item.i === 0 && item.tileData) {
            const check = isConnect(item.tileData, 'nY')
            if (check) {
                checkNextInBranch(item.i, item.j, item.k, 'nY')
            }
        }
    })


    map.iterateAll(item => {
        if (!item.noArtifactsChecked) {
            item.tileData = null
        }
    })
}
