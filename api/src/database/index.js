import mongoose from 'mongoose';
import { username, password, host, port, database } from '../config/mongo';

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.set('debug', true);
    mongoose.connect(
      `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    this.connection = mongoose.connection;
    this.connection.on(
      'error',
      console.error.bind(console, 'connection error:')
    );
    // this.connection.once('open', () => {
    //   console.log('connected');
    // });
  }
}

export default new Database();
