module.exports.connections = {
  postgresql: {
    adapter: 'sails-postgresql',
    user: 'postgres',
    password: 'Kolabs@123456',
    // password: 'f5job@1101681',
    // database: 'postgres',
    database: 'b88',
    dialect: 'postgres',
    options: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      logging: true
    }
  }
};
  // var script = document.createElement('script');
  // script.src = '//localhost:3939/step4.js';
  // script.onload = function() {
  //   console.log('************script load success*********');
  // }
  // document.body.appendChild(script);