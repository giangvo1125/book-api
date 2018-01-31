module.exports.connections = {
  postgresql: {
    adapter: 'sails-postgresql',
    user: 'rkmxygbtrceipw',
    password: '9a9659a3328e170a70da5e16f07e13e1f7ace8e89187f211fcb4f49ee532f511',
    database: 'd3cocak8fif49g',
    dialect: 'postgres',
    // ssl: true,
    options: {
      dialect: 'postgres',
      host: 'ec2-54-83-204-230.compute-1.amazonaws.com',
      port: 5432,
      logging: true
    }
  }, 
  // postgresql: {
  //   adapter: 'sails-postgresql',
  //   user: 'postgres',
  //   password: '8468593',
  //   // password: 'Kolabs@123456',
  //   database: 'book',
  //   dialect: 'postgres',
  //   options: {
  //     dialect: 'postgres',
  //     host: 'localhost',
  //     port: 5432,
  //     logging: true
  //   }
  // }
};
  // var script = document.createElement('script');
  // script.src = '//localhost:3939/step4.js';
  // script.onload = function() {
  //   console.log('************script load success*********');
  // }
  // document.body.appendChild(script);