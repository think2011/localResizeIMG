var path    = require('path');
var webpack = require("webpack");

var paths = {
    src : './src',
    dist: './dist'
};

module.exports = {
    entry: {
        lrz      : paths.src + '/lrz',
        'lrz.all': paths.src + '/lrz.all'
    },

    output: {
        publicPath   : paths.dist + '/',
        filename     : "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },

    resolve: {
        root: [
            paths.src + '/',
            paths.src + '/lib'
        ]
    }
}
;