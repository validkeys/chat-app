var JSData            = require('js-data');
var connectionsConfig = require('../../config/connections')[process.env.NODE_ENV || 'development'];
var promise           = require('bluebird');
var path              = require('path');
var glob              = require('glob');


// Have JSData use bluebird
JSData.DSUtils.Promise = promise;

// The JSData store
var store             = new JSData.DS({
  keepChangeHistory:    false,
  resetHistoryOnInject: false,
  cacheResponse:        false,
  ignoreMissing:        true,
  upsert:               false,
  bypassCache:          true,
  findInverseLinks:     false,
  findHasMany:          false,
  findBelongsTo:        false,
  findHasOne:           false,
  notify:               false,
  log:                  false
});




// Contains all of the models
var models            = {};




// Generates an adapter for each configItem in the connections config
function generateAdapters() {
  var adapters = [];
  return new promise(function(resolve, reject) {
    connectionsConfig.forEach(function(config) {
      var adapter = require(config.adapter);
      var instance = new adapter(config.settings);
      store.registerAdapter(config.name, instance, { default: config.default || false });
    });
    resolve();
  });
}




// Path to the models directory
var modelsPath        = path.join(__dirname,'..','..','models','**','*.js');

// Generates a model for each model in the models directory
function generateModels() {
  return new promise(function(resolve, reject) {
    glob(modelsPath, function(err, files) {
      files.forEach(function(file) {
        var model = require(file);

        if (!model.name) {
          model.name = file.replace('.js','');
        }

        var instance = store.defineResource(model);
        models[model.name] = instance;
      });
      resolve();
    });
  });
}




exports.register = function(server, options, next) {
  generateAdapters()
    .then(function() { return generateModels(); })
    .then(function() { 
      server.expose('models', models);
      next(); 
    })
    .catch(function(err) {
      next(err);
    })
};  

exports.register.attributes = {
  name:     "JSData",
  version:  "1.0.0"
};



exports.store   = store;
exports.models  = models;