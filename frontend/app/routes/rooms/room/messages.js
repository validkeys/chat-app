import Ember from 'ember';

let room;

export default Ember.Route.extend({

  model() {
    room = this.modelFor('rooms.room');
    this.store.query('message', { roomId: room.get('id') });
    return this.store.peekAll('message');
  },

  setupController(controller, model) {
    this._super.apply(this, arguments);
    controller.set("room", room);
  }

});