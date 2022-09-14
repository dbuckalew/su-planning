import request from 'supertest';

import app from '../../app';
import { Unit, Table } from './units.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<Unit>(Table).del();
  } catch (error) {}
});

describe('GET /api/v1/units', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/units')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
describe('POST /api/v1/units', () => {
  it('responds with an error if the user is invalid', async () =>
    request(app)
      .post('/api/v1/units')
      .set('Accept', 'application/json')
      .send({
        unit_number: '',
        unit_name: '',
        type: '',
        id: 1
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/units')
      .set('Accept', 'application/json')
      .send({
        unit_number: '0121202',
        unit_name: 'Economics',
        type: 'ipas1',
        id: 1
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('unit_number');
        expect(response.body.unit_number).toEqual('0121202');
      }),
  );
});

describe(`GET /api/v1/units/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .get(`/api/v1/units/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        let result = Unit.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/units/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/units/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        unit_number: 'test',
        unit_name: 'test',
        type: 'ip',
        id: 1
      })
      .expect(200)
      .then((response) => {
        let result = Unit.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(response.body.unit_name).toEqual('test');
      }),
  )
});