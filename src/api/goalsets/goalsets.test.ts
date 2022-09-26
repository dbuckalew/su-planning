import request from 'supertest';

import app from '../../app';
import { Goalset, Table } from './goalsets.model';
import { db } from '../../db';

beforeAll(async () => {
  try {
    await db<Goalset>(Table).del();
    await db<Goalset>(Table).insert({id: 1, begin_date: new Date("2012-08-01"), end_date: new Date("2017-07-31")});
    await db<Goalset>(Table).insert({id: 2, begin_date: new Date("2017-08-01"), end_date: new Date("2021-05-31")});
    await db<Goalset>(Table).insert({id: 1, begin_date: new Date("2021-06-01"), end_date: null});
  } catch (error) {}
});

describe('GET /api/v1/goalsets', () => {
  it('responds successfully with an array of 0 or more', async () => 
    request(app)
      .get('/api/v1/goals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});

let id = '';
let bdate = new Date(new Date().toDateString());
describe('POST /api/v1/goalsets', () => {
  it('responds with an error if the goal is invalid', async () =>
    request(app)
      .post('/api/v1/goalsets')
      .set('Accept', 'application/json')
      .send({
        begin_date: null,
        end_date: null
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/goalsets')
      .set('Accept', 'application/json')
      .send({
        begin_date: bdate,
        end_date: null
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        // console.log(`RETURNED ID: ${id}`)
        expect(response.body).toHaveProperty('begin_date');
        expect(new Date(response.body.begin_date)).toEqual(bdate);
      }),
  );
});

describe(`GET /api/v1/goalsets/${id}`, () => {
  it('responds with a single goal', async () => 
    request(app)
      .get(`/api/v1/goalsets/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // if we can successfully safeParse the response, then it is a valid Goal
        let result = Goalset.safeParse(response.body);
        expect(result.success).toEqual(true);
      }),
  )
});

describe(`PUT /api/v1/goalsets/${id}`, () => {
  it('responds with a single goalset', async () => 
    request(app)
      .put(`/api/v1/goalsets/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        begin_date: bdate,
        end_date: new Date(),
      })
      .expect(200)
      .then((response) => {
        let result = Goalset.safeParse(response.body);
        expect(result.success).toEqual(true);
        // expect(response.body.end_date).toEqual('Better goal description');
      }),
  )
});