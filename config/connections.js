module.exports.connections = {
  postgresql: {
    adapter: 'sails-postgresql',
    user: 'postgres',
    password: '8468593',
    // password: 'Kolabs@123456',
    database: 'book',
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