# :zap: Ionic Angular Auth

* App to prevent access to 'members' route if user not authorized. Authorization is via email & password converted to a JWT token instead of using a backend.
* Another great tutorial from [Simon Grimm of the IonicAcademy, Youtube video 'Building an Ionic 4 JWT Login with Tab Bar & Angular Routing'](https://www.youtube.com/watch?v=lNqXCn8KacI).

## :page_facing_up: Table of contents

* [:zap: Ionic Angular Auth](#zap-ionic-angular-auth)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-do list](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* Initial screen is a login page with email and password fields. Angular 'canActivate' authguard limits access to the 'members/' route to only authorised (JWT token-bearing) users.

## :camera: Screenshots

![screenshot](./img/login.png)

## :signal_strength: Technologies

* [Ionic v5](https://ionicframework.com/)
* [Ionic/angular v5](https://ionicframework.com/)
* [Angular v10](https://angular.io/)
* [Angular RxJS Library v6](https://angular.io/guide/rx-library) Observable functions
* [@auth0/angular-jwt v5](https://www.npmjs.com/package/@auth0/angular-jwt) provides an HttpInterceptor which automatically attaches a JSON Web Token to HttpClient requests.
* [Ionic Storage v2](https://www.npmjs.com/package/@ionic/storage) key-value Storage module based on LocalForage.

## :floppy_disk: Setup

* To start the server on _localhost://8100_ type: 'ionic serve'
* To start the server on a mobile using Ionic devapp and connected via wifi, type: 'ionic serve --devapp'
* The Ionic DevApp was installed on an Android device from the Google Play app store.

## :computer: Code Examples

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

## :cool: Features

* JWT token generated and stored using Ionic Storage. AuthGuard canActivate only true with this token. Token removed upon logging out.

## :clipboard: Status & To-do list

* Status: Working. tested using ionic server.
* To-do: nothing

## :clap: Inspiration

* [Simon Grimm of the IonicAcademy, Youtube video 'Building an Ionic 4 JWT Login with Tab Bar & Angular Routing'](https://www.youtube.com/watch?v=lNqXCn8KacI)
* [Written version of tutorial from Devtactic website: Building an Ionic 4 JWT Login with Tab Bar & Angular Routing](https://devdactic.com/ionic-4-jwt-login/)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
