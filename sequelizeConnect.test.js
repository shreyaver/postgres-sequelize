const Sequelize = require('sequelize');

describe('sequelize', () => {
  const sequelize = new Sequelize('test', 'Shreya_Verma', 'asd', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
  });
  it('should establish connection', (done)=> {
    const callback = (data) =>{
      expect(data).toEqual('Connection has been established successfully');
      done();
    }
    sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
        callback('Connection has been established successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
        callback('Unable to connect to the database');
    })
  }); 
  it('should create table with entry', () => {
    const User = sequelize.define('abc', {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE
    });
    sequelize.sync()
      .then(() => User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
      })) 
      .then(jane => {
        console.log(jane.toJSON());
      });
    User.findAll({
      attributes: ['username', 'birthday']
    }).then((obj) => console.log(obj));
    //console.log(sequelize.query('SELECT * FROM user;'));
  });
  it('should be shut down successfully', (done)=> {
    const callback = (data) =>{
      expect(data).toEqual('Closed connection');
      done();
    }
    sequelize.connectionManager.close()
    .then(() => { 
      console.log('Closed connection')
      callback('Closed connection')
    }) 
    .catch(err => {
      console.error('Unable to close connection: ', err);
      callback('Unable to close connection');
    });
  });
});
