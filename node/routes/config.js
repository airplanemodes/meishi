/* Routes configuration file */

const usersRoute = require('./users');
const cardsRoute = require('./cards');

exports.routes = (app) => {
    app.use('/users', usersRoute);
    app.use('/cards', cardsRoute);
    
    app.use((req,res) => {
        res.json({msg:"404 Page not found"});
    });
}

exports.allowAccessControl = (app) => { 
  app.all('*', function (req, res, next) {
      if (!req.get('Origin')) return next();
      // write the domain name instead of '*' if it runs outside the localhost 
      res.set('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
      res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-auth-token');
      next();
  });
}