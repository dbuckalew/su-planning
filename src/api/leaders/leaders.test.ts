import request from 'supertest';

import app from '../../app';
import { Leader, Table } from './leaders.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<Leader>(Table).del();
  } catch (error) {}
});

describe('GET /api/v1/leaders', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/leaders')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
let bdate = new Date();
let edate = new Date();
let cdate = new Date();
edate.setFullYear(bdate.getFullYear() + 1); 
cdate.setFullYear(bdate.getFullYear() + 2);
console.log('EDATE', edate);
console.log('CDATE', cdate);
describe('POST /api/v1/leaders', () => {
  it('responds with an error if the user is invalid', async () =>
    request(app)
      .post('/api/v1/leaders')
      .set('Accept', 'application/json')
      .send({
        staff: 0,
        unit: 0,
        beginning: bdate.toDateString(),
        ending: edate.toDateString(),
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/leaders')
      .set('Accept', 'application/json')
      .send({
        id: 1,
        staff: 1,
        unit: 1,
        beginning: new Date(bdate.toDateString()),
        ending: new Date(edate.toDateString()),
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('staff');
        expect(response.body.staff).toEqual(1);
        expect(response.body).toHaveProperty('unit');
        expect(response.body.unit).toEqual(1);
      }),
  );
});

describe(`GET /api/v1/leaders/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .get(`/api/v1/leaders/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        let result = Leader.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/leaders/${id}`, () => {
  it('responds with a single user', async () => 
    request(app)
      .put(`/api/v1/leaders/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        id: 1,
        staff: 1,
        unit: 1,
        beginning: new Date(bdate.toDateString()),
        ending: new Date(cdate.toDateString()),
      })
      .expect(200)
      .then((response) => {
        let result = Leader.safeParse(response.body);
        expect(result.success).toEqual(true);
        expect(new Date(response.body.ending)).toEqual(new Date(cdate.toDateString()));
      }),
  )
});