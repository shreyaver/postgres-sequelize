const Sequelize = require('sequelize');

  const sequelize = new Sequelize('test', 'Shreya_Verma', 'asd', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
  });
  sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    })
    const User = sequelize.define('abc', {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE
    });
    // sequelize.sync()
    //   .then(() => User.create({
    //     username: 'janedoe',
    //     birthday: new Date(1980, 6, 20)
    //   })) 
    //   .then(jane => {
    //     console.log(jane.toJSON());
    //   });
  
module.exports = {sequelize, User};
