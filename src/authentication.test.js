import assert from 'assert';
import { Authentication } from './authentication';
import { AuthProxyConfig } from './config';

AuthProxyConfig.url = 'http://localhost:3000';

describe('Authentication', () => {
  describe('authenticate', () => {
    it('should not authenticate with wrong data', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('wrong@email.com', 'wrongpassword');
      assert(authenticated === false);
    });

    xit('should authenticate with correct data', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(authenticated === true);
    });
  });

  describe('isAuthenticated', () => {
    xit('should return true if a user is authenticated', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(await authManager.isAuthenticated());
    });

    it('should return false if a user is not authenticated', async () => {
      const authManager = new Authentication();
      authManager.logout();
      assert(!(await authManager.isAuthenticated()));
    });
  });

  describe('logout', () => {
    xit('should allow user to logout', async () => {
      const authManager = new Authentication();
      const authenticated = await authManager.authenticate('correct@email.fr', 'correctpassword');
      assert(await authManager.isAuthenticated());
      authManager.logout();
      assert(!(await authManager.isAuthenticated()));
    });
  })
});

