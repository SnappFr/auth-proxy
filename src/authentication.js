import { Config } from './config';
import { Permission } from './permission';
import 'isomorphic-fetch';

export class Authentication {
  async authenticate(email, password) {
    const response = await fetch(`${Config.getUrl()}/auth/sign_in`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-type': 'application/json' }
    });

    if (response.status === 200) {
      const body = await response.json();
      this.setAuthData(response.headers);
      this.setPermissions(body);
    }
    return response.status === 200;
  }
  
  async isAuthenticated() {
    const response = await fetch(`${Config.getUrl()}/is-authenticated`, {
      method: 'POST',
      headers: {
        'access-token': localStorage.getItem('token'),
        'token-type': 'Bearer',
        uid: localStorage.getItem('uid'),
        client: localStorage.getItem('client'),
      }
    });

    return response.status === 200;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
  }

  getHeaders(endpoint) {
    return Object.assign({
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
      'access-token': localStorage.getItem('token'),
      'token-type': 'Bearer'
    }, (endpoint ? { 'x-api-endpoint': endpoint } : {}));
  }

  setPermissions(jsonPermission) {
    this.permissions = new Permission(jsonPermission.endpoints);
  }

  setAuthData(headers) {
    localStorage.setItem('token', headers.get('access-token'));
    localStorage.setItem('uid', headers.get('uid'));
    localStorage.setItem('client', headers.get('client'));
  }

}
