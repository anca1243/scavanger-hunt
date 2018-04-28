// Initializes the `astronauts` service on path `/astronauts`
const createService = require('./astronauts.class.js');
const hooks = require('./astronauts.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'astronauts',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/astronauts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('astronauts');

  service.hooks(hooks);
};
