const assert = require('assert');
const app = require('../../src/app');

describe('\'astronauts\' service', () => {
  it('registered the service', () => {
    const service = app.service('astronauts');

    assert.ok(service, 'Registered the service');
  });
});
