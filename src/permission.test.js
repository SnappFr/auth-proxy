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
        JSON.stringify(handler.of('reward')) ===
        JSON.stringify(['admin.all', 'view.all', 'edit.all'])
      )
    });
  });
  
  describe('isAuthorizedTo', () => {
    describe('With string provided', () => {
      it('should return true if action is among list', () => {
        assert(handler.on('reward').isAuthorizedTo('view.all'));
      });
      
      it('should return false if action is not among list', () => {
        assert(!handler.on('reward').isAuthorizedTo('say.coucou'));
      });
    });
    describe('With array provided', () => {
      it('should return true if any action is among list', () => {
        assert(handler.on('reward').isAuthorizedTo(['view.all', 'say.coucou']));
      });

      it('should return false if no action is among list', () => {
        assert(!handler.on('reward').isAuthorizedTo(['say.hello', 'say.coucou']));
      });
      
      it('should trow error if no action provided', () => {
        assert.throws(() => handler.on('reward').isAuthorizedTo([]));
      });
    });
  });
});

