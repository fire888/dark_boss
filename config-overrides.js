const path = require('path');
module.exports = {
    paths: function (paths, env) {

        const folder = process.env.FOLDER.trim()

        paths.appPublic = path.resolve(`${ __dirname }/src/${ folder }/public`)
        paths.appHtml = path.resolve(`${ __dirname }/src/${ folder }/public/index.html`)
        paths.appIndexJs = path.resolve(`${ __dirname }/src/${ folder }/src/index.js`)
        paths.appBuild = path.resolve(`${ __dirname }/build/${ folder }`)

        return paths;
    },
}

