import Ember from 'ember';

export default Ember.Controller.extend({

  filteredMessages: Ember.computed('content.[]', 'room', function() {
    var records = this.get('content').toArray();
    return _.filter(records, (item) => {
      console.log(item.get('room'));
      return item.get('room.id') === this.get('room.id');
    })
  })

});