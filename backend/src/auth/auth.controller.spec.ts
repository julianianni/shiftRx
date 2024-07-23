import * as request from 'supertest';
import { createE2ETestEnvironment, E2ETestEnvironment } from '../e2e.helper';

describe('AuthController (e2e)', () => {
  let testEnv: E2ETestEnvironment;

  beforeEach(async () => {
    testEnv = await createE2ETestEnvironment();
  });

  it('/POST auth/login', async () => {
    await testEnv.createUser();
    return request(testEnv.app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'john.doe@example.com', password: 'password123' })
      .expect(200);
  });

  afterAll(async () => {
    await testEnv.app.close();
  });
});
