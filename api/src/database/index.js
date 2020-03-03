import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.connect('mongodb://docker:docker@localhost:27017/Afiliart', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.connection = mongoose.connection;
    this.connection.on(
      'error',
      console.error.bind(console, 'connection error:')
    );
    this.connection.once('open', () => {
      console.log('connected');
    });
  }
}

export default new Database();
