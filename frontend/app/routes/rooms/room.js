import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return this.store.findRecord('room', params.room_id);
  },

  redirect() {
    return this.transitionTo('rooms.room.messages');
  }

});