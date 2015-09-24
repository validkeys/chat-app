import Ember from 'ember';

export default Ember.Route.extend({

  socketIO: Ember.inject.service('socket-io'),

  socket:   null,

  currentlyJoinedRoom: null,

  init() {
    console.log('initializing');
    this._super.apply(this, arguments);
    var socket = this.get('socketIO').socketFor('http://localhost:3000/');
    this.set("socket", socket);

    socket.on('joinedRoom', (data) => {
      Ember.run(this, function() {
        this.controllerFor('rooms.room').get('notifications').pushObject(Ember.Object.create(data));
      }); 
    });
  },

  model: function(params) {
    return this.store.findRecord('room', params.room_id);
  },

  redirect() {
    return this.transitionTo('rooms.room.messages');
  },

  activate() {
    var model = this.modelFor('rooms.room');
    this.set('currentlyJoinedRoom', model);
    this.get('socket').emit('joinedRoom', { user: {name: "Kyle Davis"}, room: { id: model.get('id') } });
  },

  deactivate() {
    var model = this.get('currentlyJoinedRoom');
    this.get('socket').emit('leftRoom', { user: {name: "Kyle Davis"}, room: { id: model.get('id') } });
    this.set('currentlyJoinedRoom', null);
  },

  resetController(controller, isExiting, transition) {
    var model     = this.get('currentlyJoinedRoom');
    var newModel  = this.modelFor('rooms.room');
    this.get('socket').emit('leftRoom', { user: {name: "Kyle Davis"}, room: { id: model.get('id') } });
    this.get('socket').emit('joinedRoom', { user: {name: "Kyle Davis"}, room: { id: newModel.get('id') } });
    this.set('currentlyJoinedRoom', newModel);
  }

});