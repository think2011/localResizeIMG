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
        filename     : "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        libraryTarget: 'umd'
    },

    resolve: {
        root: [
            paths.src + '/',
            paths.src + '/lib'
        ]
    }
};