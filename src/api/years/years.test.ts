import request from 'supertest';

import app from '../../app';
import { Year, Table } from './years.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<Year>(Table).del();
  } catch (error) {}
});

describe('GET /api/v1/years', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/years')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
describe('POST /api/v1/years', () => {
  it('responds with an error if the user is invalid', async () =>
    request(app)
      .post('/api/v1/years')
      .set('Accept', 'application/json')
      .send({
        beginyear: 1999,
        endyear: 3001,
        id: 2
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/years')
      .set('Accept', 'application/json')
      .send({
        beginyear: 2011,
        endyear: 2012,
        id: 2
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        // console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('beginyear');
        expect(response.body.beginyear).toEqual(2011);
      }),
  );
});

describe(`GET /api/v1/years/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .get(`/api/v1/years/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        let result = Year.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/years/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/years/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        beginyear: 2012,
        endyear: 2013,
        id: 2
      })
      .expect(200)
      .then((response) => {
        let result = Year.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(response.body.beginyear).toEqual(2012);
        expect(response.body.endyear).toEqual(2013);
        expect(response.body.id).toEqual(2);
      }),
  )
});