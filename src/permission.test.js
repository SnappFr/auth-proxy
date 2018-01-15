import { Permission } from './permission';
import assert from 'assert';

describe('Permission', () => {

  const endpoints = [
    { 
      name: 'reward', 
      permissions: ['admin.all', 'view.all', 'edit.all']
    }
  ];
  const handler = new Permission(endpoints);

  describe('list', () => {
    it('should list permissions of an endpoint', () => {
      assert(
        JSON.stringify(handler.listOf('reward')) ===
        JSON.stringify(['admin.all', 'view.all', 'edit.all'])
      )
    });
  });
  
  describe('isAuthorizedTo', () => {
    it('should return true if action is among list', () => {
      assert(handler.on('reward').isAuthorizedTo('view.all'));
    });
    
    it('should return false if action is not among list', () => {
      assert(!handler.on('reward').isAuthorizedTo('say.coucou'));
    });
  });
});

