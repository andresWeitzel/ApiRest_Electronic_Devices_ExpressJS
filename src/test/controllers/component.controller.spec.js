//External
const supertest = require('supertest');
//Server
const app = require('../../server.js');
//Const-vars
//const requestWithSupertest = supertest(server);

  
describe('GET /list', () => {

describe('Get all list from components', () => {

    it('should respond with a 200 status code', async () => {
      const res = await request(app).get('/list');
        expect(res.status).toEqual(200);
        //expect(res.type).toEqual(expect.stringContaining('json'));
        //expect(res.body).toHaveProperty('users')
    });
  
  });
});





//Check this solution
//https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function
/*

I am using Jest and Supertest, but was receiving the same error. It was because my server takes time to setup (it is async to setup db, read config, etc). I needed to use Jest's beforeAll helper to allow the async setup to run. I also needed to refactor my server to separate listening, and instead use @Whyhankee's suggestion to create the test's server.

index.js

export async function createServer() {
  //setup db, server,config, middleware
  return express();
}

async function startServer(){
  let app = await createServer();
  await app.listen({ port: 4000 });
  console.log("Server has started!");
}

if(process.env.NODE_ENV ==="dev") startServer();

test.ts

import {createServer as createMyAppServer} from '@index';
import { test, expect, beforeAll } from '@jest/globals'
const supertest = require("supertest");
import * as http from 'http';
let request :any;

beforeAll(async ()=>{
  request = supertest(http.createServer(await createMyAppServer()));
})

test("fetch users", async (done: any) => {
  request
    .post("/graphql")
    .send({
      query: "{ getQueryFromGqlServer (id:1) { id} }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      let serverErrors = JSON.parse(res.text)['errors'];
      expect(serverErrors.length).toEqual(0);
      expect(res.body.data.id).toEqual(1);
      done();
    });
});

Edit:

I also had errors when using data.foreach(async()=>..., should have use for(let x of... in my tests
*/