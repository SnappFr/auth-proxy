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

    return this.setPermissions(response);
  }
  
  async isAuthenticated() {
    const response = await fetch(`${Config.getUrl()}/is-authenticated`, {
      method: 'POST',
      headers: {
        'access-token': localStorage.getItem('AuthProxy.token'),
        'token-type': 'Bearer',
        uid: localStorage.getItem('AuthProxy.uid'),
        client: localStorage.getItem('AuthProxy.client'),
      }
    });

    return this.setPermissions(response);
  }

  logout() {
    localStorage.removeItem("AuthProxy.token");
    localStorage.removeItem("AuthProxy.uid");
    localStorage.removeItem("AuthProxy.client");
  }

  getHeaders(endpoint) {
    return Object.assign({
      uid: localStorage.getItem('AuthProxy.uid'),
      client: localStorage.getItem('AuthProxy.client'),
      'access-token': localStorage.getItem('AuthProxy.token'),
      'token-type': 'Bearer'
    }, (endpoint ? { 'x-api-endpoint': endpoint } : {}));
  }

  async setPermissions(response) {
    if (response.status === 200) {
      const body = await response.json();
      this.setAuthData(response.headers);
      this.setPermissions(body);
      this.permissions = new Permission(body.endpoints);
    }
    return response.status === 200;
  }

  setAuthData(headers) {
    localStorage.setItem('AuthProxy.token', headers.get('access-token'));
    localStorage.setItem('AuthProxy.uid', headers.get('uid'));
    localStorage.setItem('AuthProxy.client', headers.get('client'));
  }

}
