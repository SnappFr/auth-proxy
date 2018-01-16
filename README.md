# Snapp-Auth-proxy

This module is used as an internal front end package that allows us to authenticate to our global authentication micro service.

## Should I use it ? 

For now, snapp-auth-proxy is highly dependent to our closed-source authentication micro service. We may consider open sourcing it in the future.

## Install

`npm install --save snapp-auth-proxy` or `yarn add snapp-auth-proxy`

## Usage

First thing you need to do is set the server URL by doing;

```javascript
import { Config } from 'snapp-auth-proxy';

Config.url = 'https://authproxyurl.com/'
```

Once you've done that, you will be able to call the following classes and methods


#### Define the authenticator

You must define the user and keep the reference to it among your app's lifecycle

```javascript
import { Authentication } from 'snapp-auth-proxy';
const user = new Authentication(); // Keep a reference to the user variable
```

#### Authenticate a user

```javascript
await user.authenticate('your@email.com', 'yourpassword');
// returns true/false
```

#### Check if a user is logged in 

```javascript
await user.isAuthenticated();
// returns true/false
```

#### Disconnect a user

```javascript
user.logout();
```

#### Get current users's permissions

```javascript
user.permissions.listOf('microServiceName')
// returns an array of actions authorized, for instance: ['edit.post', 'create.post']
```

#### Check if user is authorized to do specific actions

```javascript
user.permissions.on('microServiceName').isAuthorizedTo('edit.post');
// returns true/false
```

#### Check if user can do any of an array of actions

This method is useful to provide access to different types of users. 
For example, viewing a post in you blog app might be authorized to people who can `manage.posts`, `manage.everything`, or just `view.post`

```javascript
// You can also check authorization again an array of permissions
user.permissions.on('microServiceName').isAuthorizedTo([
  'manage.posts',
  'manage.everything',
  'view.post',
]);
```

#### Get HTTP headers for current user

```javascript
user.getHeaders('microServiceName');
```

