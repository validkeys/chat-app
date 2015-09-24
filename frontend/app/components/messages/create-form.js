import Ember from 'ember';

export default Ember.Component.extend({

  room:     null,
  contentField:  "",

  store:    Ember.inject.service(),

  actions: {
    submit: function() {
      var record = this.get('store').createRecord('message', {
        room: this.get('room'),
        content: this.get('contentField')
      });

      record
        .save()
        .then((newRecord) => {
          console.log("MEssage created!");
        })
        .catch((e) => {
          console.error(e);
        })
    }
  }

});
