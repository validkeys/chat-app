import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  // If the relationship is a belongs to, we want to include _id at the end of the property
  // (ex. business_id)
  // So here we are adding that _id
  keyForRelationship: function(name, type, method) {
    if (type === "belongsTo" && method === "serialize") {
      return name + "Id";
    } else {
      return this._super.apply(this, arguments);
    }
  },


  serializeIntoHash: function(data, type, record, options) {
    let root    = Ember.String.underscore(type.modelName);
    data[root]  = this.serialize(record, options);
  }
});
