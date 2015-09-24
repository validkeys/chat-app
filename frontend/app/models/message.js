import DS from 'ember-data';

export default DS.Model.extend({

  content:  DS.attr('string'),

  room:     DS.belongsTo('room', { inverse: 'messages', async: true })

}); 