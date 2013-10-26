/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);

  // XXX default and banner to be implemented
  this.argument('attributes', {
    type: Array,
    defaults: [],
    banner: 'field[:type] field[:type]'
  });

  // parse back the attributes provided, build an array of attr
  this.attrs = this.attributes.map(function (attr) {
    var parts = attr.split(':');
    return {
      name: parts[0],
      type: parts[1] || 'string'
    };
  });

}

util.inherits(Generator, scriptBase);

Generator.prototype.createModelFiles = function createModelFiles() {
  this.writeTemplate('model', path.join('app/scripts/models', this.name));

  if (!this.options.requirejs) {
    this.addScriptToIndex('models/' + this.name);
  }
};
