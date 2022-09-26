import request from 'supertest';

import app from '../../app';
import { Goal, Table } from './goals.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<Goal>(Table).del();
  } catch (error) {}
});

describe('GET /api/v1/goals', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/goals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
describe('POST /api/v1/goals', () => {
  it('responds with an error if the goal is invalid', async () =>
    request(app)
      .post('/api/v1/goals')
      .set('Accept', 'application/json')
      .send({
        setid: 0,
        goal_num: 1,
        goal_name: 'Goal Name',
        goal_desc: 'Goal description'
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/goals')
      .set('Accept', 'application/json')
      .send({
        id: 1,
        setid: 1,
        goal_num: 1,
        goal_name: 'Goal Name',
        goal_desc: 'Goal description'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        // console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('goal_name');
        expect(response.body.goal_name).toEqual('Goal Name');
      }),
  );
});

describe(`GET /api/v1/goals/${id}`, () => {
  it('responds with a single goal', async () => 
    request(app)
      .get(`/api/v1/goals/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // if we can successfully safeParse the response, then it is a valid Goal
        let result = Goal.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/goals/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/goals/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        setid: 1,
        goal_num: 1,
        goal_name: 'Goal Name',
        goal_desc: 'Better goal description'
      })
      .expect(200)
      .then((response) => {
        let result = Goal.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(response.body.goal_desc).toEqual('Better goal description');
      }),
  )
});