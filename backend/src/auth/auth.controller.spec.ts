import * as request from 'supertest';
import { createE2ETestEnvironment, E2ETestEnvironment } from '../e2e.helper';

describe('AuthController (e2e)', () => {
  let testEnv: E2ETestEnvironment;

  beforeEach(async () => {
    testEnv = await createE2ETestEnvironment();
  });

  it('/POST users/register', () => {
    return request(testEnv.app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);
  });

  it('/POST users/login', () => {
    return request(testEnv.app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);
  });

  afterAll(async () => {
    await testEnv.app.close();
  });
});
