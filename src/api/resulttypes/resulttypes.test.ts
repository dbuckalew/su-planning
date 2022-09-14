import request from 'supertest';

import app from '../../app';
import { ResultType, Table } from './resulttypes.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<ResultType>(Table).del();
    await db<ResultType>(Table).insert({id: 1, name: 'TRADITIONAL', desc: null});
    await db<ResultType>(Table).insert({id: 2, name: 'ONLINE', desc: null});
  } catch (error) {}
});

describe('GET /api/v1/types', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/types')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
describe('POST /api/v1/types', () => {
  it('responds with an error if the user is invalid', async () =>
    request(app)
      .post('/api/v1/types')
      .set('Accept', 'application/json')
      .send({
        name: '',
        desc: ''
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/types')
      .set('Accept', 'application/json')
      .send({
        name: 'TEST',
        desc: 'test',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toEqual('TEST');
      }),
  );
});

describe(`GET /api/v1/types/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .get(`/api/v1/types/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        let result = ResultType.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/types/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/types/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: 'RETEST',
        desc: 'retest',
        id: id
      })
      .expect(200)
      .then((response) => {
        let result = ResultType.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(response.body.name).toEqual('RETEST');
        expect(response.body.desc).toEqual('retest');
      }),
  )
});