import Ember from 'ember';

export default Ember.Route.extend({

  socketIO: Ember.inject.service('socket-io'),

  init() {
    this._super.apply(this, arguments);

    var socket = this.get('socketIO').socketFor('http://localhost:3000');

    socket.on('connect', function() {
      console.info("Connected to socket server");
    });

    socket.on('db', (msg) => {
      let { type, method, payload } = msg;

      Ember.run(this, function() {
        var existingRecord = this.get('store').peekRecord(type, payload.id);
        if (existingRecord) {
          existingRecord.setProperties(payload);
        } else {
          var storePayload = {};
          storePayload[type] = payload;
          this.get('store').pushPayload(type, storePayload);
        }
      });    
    });
  }

});