import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) {

}

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

}
