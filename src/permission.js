
export class Permission {
  constructor(arrayOfPermissions) {
    this.endpoints = arrayOfPermissions;
  }

  of(endpointName) {
    return this.endpoints
      .find(endpoint => endpoint.name === endpointName)
      .permissions;
  }

  on(endpointName) {
    this.workspaceEndpoint = this.endpoints.find(endpoint => endpoint.name === endpointName);
    return this;
  }

  isAuthorizedTo(action) {
    return this.of(this.workspaceEndpoint.name).find(permission => permission === action) !== undefined;
  }

  isAuthorizedToDoAnyOf(actions) {
    if (!actions.length) throw Error('Empty array of permissions provided');
    const authorizedOrNot = actions.map(action => this.of(this.workspaceEndpoint.name).find(permission => permission === action) !== undefined);
    return authorizedOrNot.includes(true);
  }

}
