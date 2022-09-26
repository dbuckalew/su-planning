import request from 'supertest';

import app from '../../app';
import { Plan, Table } from './plans.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<Plan>(Table).del();
  } catch (error) {}
});

describe('GET /api/v1/plans', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/plans')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
let completiondate = new Date();
describe('POST /api/v1/plans', () => {
  it('responds with an error if the plan is invalid', async () =>
    request(app)
      .post('/api/v1/plans')
      .set('Accept', 'application/json')
      .send({
        ayear: 1,
        outcomenumber: '1',
        goal: 1,
        objective: '',
        outcometype: '',
        outcome: '',
        graduatecompetencies: '',
        assessment: '',
        completiondate: new Date(completiondate.toDateString()),
        budget: '0',
        action: '',
        measure: '',
        unit_id: 1,
        created_at: completiondate,
        updated_at: completiondate,
        created_by: 1,
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/plans')
      .set('Accept', 'application/json')
      .send({
        fileID: 1,
        ayear: 2,
        outcomenumber: '1',
        goal: 1,
        objective: 'Objective',
        outcometype: '',
        outcome: '',
        graduatecompetencies: '',
        assessment: '',
        completiondate: new Date(completiondate.toDateString()),
        budget: '0',
        action: '',
        measure: '',
        unit_id: 1,
        created_at: completiondate,
        updated_at: completiondate,
        created_by: 1,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('fileID');
        id = response.body.fileID;
        console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('objective');
        expect(response.body.objective).toEqual('Objective');
      }),
  );
});

describe(`GET /api/v1/plans/1`, () => {
  it('responds with a single plan', async () => 
    request(app)
      .get(`/api/v1/plans/1`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        console.log(`FETCH SINGLE PLAN RESULT: ${JSON.stringify(response.body)}`);
        let result = Plan.safeParse(response.body);
        console.log(`FETCH SINGLE PLAN PARSE RESULT: ${JSON.stringify(result)}`);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/plans/1`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/plans/1`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        fileID: 1,
        ayear: 2,
        outcomenumber: '1',
        goal: 1,
        objective: '',
        outcometype: '',
        outcome: '',
        graduatecompetencies: '',
        assessment: '',
        completiondate: new Date(completiondate.toDateString()),
        budget: '0',
        action: 'Some action was taken',
        unit_id: 1,
        measure: '',
        created_at: completiondate,
        updated_at: new Date(),
        created_by: 1,
      })
      .expect(200)
      .then((response) => {
        console.log(`PLAN PUT RESPONSE: ${JSON.stringify(response.body)}`);
        let result = Plan.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(response.body.action).toEqual('Some action was taken');
      }),
  )
});

afterAll(async () => {
  try {
    await db<Plan>(Table).del();
  } catch (error) {}
});
