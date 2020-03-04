import Database from '../../src/database';

export default () => Database.connection.db.dropDatabase();
