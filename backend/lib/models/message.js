module.exports = {
  name: 'message',
  
  relations: {
    belongsTo: {
      room: {
        localField: 'room',
        localKey:   'roomId'
      }
    }
  }
};