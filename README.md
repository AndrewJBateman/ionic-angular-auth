# Ionic Angular Auth

App to prevent access to 'members' route if user not authorized. Authorization is via email & password converted to a JWT token instead of using a backend.

This is another great tutorial from [Simon Grimm of the IonicAcademy, Youtube video 'Building an Ionic 4 JWT Login with Tab Bar & Angular Routing'](https://www.youtube.com/watch?v=lNqXCn8KacI).

## Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

* Initial screen is a login page with email and password fields. Angular 'canActivate' authguard limits access to the 'members/' route to only authorised (JWT token-bearing) users.

## Screenshots

![screenshot](./img/home_csv.png)

## Technologies

* [Ionic v5.0.0](https://ionicframework.com/)
* [Ionic/angular v4.7.1](https://ionicframework.com/)
* [Angular v8.1.2](https://angular.io/)
* [Angular RxJS Library v6.5.1](https://angular.io/guide/rx-library) Observable functions
* [Angular JWT library v3.0.0](https://www.npmjs.com/package/@auth0/angular-jwt) provides an HttpInterceptor which automatically attaches a JSON Web Token to HttpClient requests. Used as a standalone JWT decoder.
* [Ionic Storage v2.2.0](https://www.npmjs.com/package/@ionic/storage) key-value Storage module based on LocalForage.

## Setup

* To start the server on _localhost://8100_ type: 'ionic serve'
* To start the server on a mobile using Ionic devapp and connected via wifi, type: 'ionic serve --devapp'
* The Ionic DevApp was installed on an Android device from the Google Play app store.

## Code Examples

* canActivate function uses auth service to see if user authorized.

```typescript

// uses auth.service to check if user has token in storage. Returns true if there is a token
// returns false if user does not have a token and navigates to initial login page.
canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
  return this.auth.user.pipe(
    take(1),
    map(user => {
      console.log('Can activate: ', user);
      if (!user) {
        this.alertCtrl.create({
          header: 'Unauthorized',
          message: 'You are not allowed to access that page.',
          buttons: ['OK']
        }).then(alert => alert.present());

        this.router.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
    })
  );
}
```

## Features

* JWT token generated and stored using Ionic Storage. AuthGuard canActivate only true with this token. Token removed upon logging out.

## Status & To-do list

* Status: Working. tested using ionic server.

* To-do: change to use dummy backend random user data then change to a proper backend. Use in one of my own Ionic apps.

## Inspiration

[Simon Grimm of the IonicAcademy, Youtube video 'Building an Ionic 4 JWT Login with Tab Bar & Angular Routing'](https://www.youtube.com/watch?v=lNqXCn8KacI)

[Written version of tutorial from Devtactic website: Building an Ionic 4 JWT Login with Tab Bar & Angular Routing](https://devdactic.com/ionic-4-jwt-login/)

## Contact

Repo created by [ABateman](https://www.andrewbateman.org) - feel free to contact me!
