import request from 'supertest';

import app from '../../app';
import { User, Table } from './users.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<User>(Table).del();
  } catch (error) {}
});

describe('GET /api/v1/users', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
describe('POST /api/v1/users', () => {
  it('responds with an error if the user is invalid', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        first_name: '',
        last_name: '',
        extension: 5427,
        email: '',
        admin: 1
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        first_name: 'Doss',
        last_name: 'Buckalew',
        extension: 5427,
        email: 'dbuckalew@suscc.edu',
        admin: 1
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('first_name');
        expect(response.body.first_name).toEqual('Doss');
      }),
  );
});

describe(`GET /api/v1/users/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('extension');
        expect(response.body).toHaveProperty('admin');
        let result = User.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/users/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        first_name: 'Fred',
        last_name: 'Buckalew',
        extension: 5427,
        email: 'dbuckalew@suscc.edu',
        admin: 1
      })
      .expect(200)
      .then((response) => {
        let result = User.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(response.body.first_name).toEqual('Fred');
      }),
  )
});