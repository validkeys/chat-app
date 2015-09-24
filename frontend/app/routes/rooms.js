import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.findAll('room');
  },

  actions: {
    roomCreated() {
      return false;
    }
  }

});