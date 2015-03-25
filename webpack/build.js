/* @flow weak */

'use strict'

var webpack = require('webpack')
var gutil = require('gulp-util')
var fs = require('fs');
var path = require('path')

module.exports = function(webpackConfig) {
  return function(callback) {
    webpack(webpackConfig, function(fatalError, stats) {
      var jsonStats = stats.toJson()
      var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0]

      if (buildError)
        throw new gutil.PluginError('webpack', buildError)

      var outputFilename = path.join(__dirname, 'stats.json');
      fs.writeFile(outputFilename, JSON.stringify(jsonStats, null, 4), function(err) {
        if(err) {
          gutil.log('[webpack]', err);
        }
      })

      gutil.log('[webpack]', stats.toString({
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }))

      callback()
    })
  }
}
