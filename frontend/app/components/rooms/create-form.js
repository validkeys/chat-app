import Ember from 'ember';

export default Ember.Component.extend({

  onCreate:     'roomCreated',
  newRoomName:  "",

  store:        Ember.inject.service(),

  actions: {
    createRoom: function() {
      var store   = this.get('store');
      var record  = this.get('store').createRecord('room', { name: this.get('newRoomName') });
      record.save()
        .then((newRecord) => { 
          this.sendAction('onCreate', newRecord);
          this.set("newRoomName", "");
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }

});
