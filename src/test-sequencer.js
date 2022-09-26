const path = require('path');

const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const orderPath = [
      path.join(__dirname, '/test/api.test.ts'),
      path.join(__dirname, '/test/app.test.ts'),
      path.join(__dirname, '/api/users/users.test.ts'),
      path.join(__dirname, '/api/goalsets/goalsets.test.ts'),
      path.join(__dirname, '/api/goals/goals.test.ts'),
      path.join(__dirname, '/api/units/units.test.ts'),
      path.join(__dirname, '/api/years/years.test.ts'),
      path.join(__dirname, '/api/resulttypes/resulttypes.test.ts'),
      path.join(__dirname, '/api/leaders/leaders.test.ts'),
      path.join(__dirname, '/api/plans/plans.test.ts'),
    ];
    // console.log('TEST ORDER', tests);
    //return tests;

    return tests.sort((testA, testB) => {
      const indexA = orderPath.indexOf(testA.path);
      const indexB = orderPath.indexOf(testB.path);

      if (indexA === indexB) return 0; // do not swap when tests both not specify in order.

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA < indexB ? -1 : 1;
    });
  }
}

module.exports = CustomSequencer;
