module.exports = {
  name: 'room',

  relations: {
    hasMany: {
      message: {
        localField: 'messages',
        foreignKey: 'roomId'
      }
    }
  }
};