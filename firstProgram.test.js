const Sequelize = require('sequelize');
const seq = require('./firstProgram.js')

it ('should return next entry data', async (done) => {
    await seq.User.count().then(c => {
        console.log('Count before insertion:', c);
    });
    const User = seq.sequelize.define('abc', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
      });
      
    await seq.sequelize.sync()
        .then(() => User.create({
          username: 'forrest gump',
          birthday: new Date(1997, 5, 30)
        })) 
        .then(forrest => {
          console.log(forrest.toJSON());
        });
    const callback = (data) =>{
      expect(data).toEqual({ 'username': 'forrest gump', 'birthday': new Date(1997, 5, 30) });
      done();
    }
    await User.count().then(c => {
        console.log('Count after insertion:', c);
    });
    seq.User.findAll({
      attributes: ['username', 'birthday']
    }).then((obj) => { 
      console.log(obj[obj.length-1].dataValues);
      callback(obj[obj.length-1].dataValues);
    });
});

it ('should return error when we reference new column', async (done) => {
    await seq.User.count().then(c => {
        console.log('Count before insertion:', c);
    });
    const User = seq.sequelize.define('abc', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE,
        nationality: Sequelize.STRING,
      });
    const callback = (data) =>{
      expect(data).toEqual('column "nationality" of relation "abcs" does not exist');
      done();
    }
    try {
    await seq.sequelize.sync()
        .then(() => User.create({
          username: 'forrest gump',
          birthday: new Date(1997, 5, 30),
          nationality: 'American'
        })) 
        .then(forrest => {
          console.log(forrest.toJSON());
        });
    await User.count().then(c => {
        console.log('Count after insertion:', c);
    });
    seq.User.findAll({
      attributes: ['username', 'birthday']
    }).then((obj) => { 
      console.log(obj[obj.length-1].dataValues);
      callback(obj[obj.length-1].dataValues);
    });} catch (err){
        console.log(err.message);
        callback(err.message);
    }
});
afterAll(() => {
  seq.User.sequelize.close();
});
