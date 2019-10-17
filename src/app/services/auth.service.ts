import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'auth-token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public user: Observable<any>;
	private userData = new BehaviorSubject(null);

	constructor(
		private storage: Storage,
		private http: HttpClient,
		private plt: Platform,
		private router: Router
	) {
		this.loadStoredToken();
	}

	loadStoredToken() {
		const platformObs = from(this.plt.ready());

		this.user = platformObs.pipe(
			switchMap(() => {
				return from(this.storage.get(TOKEN_KEY));
			}),
			map(token => {
				console.log('token from storage: ', token);
				if (token) {
					const decoded = helper.decodeToken(token);
					console.log('decoded: ', decoded);
					this.userData.next(decoded);
					return true;
				} else {
					return null;
				}
			})
		);
	}

	login(credentials: {email: string, password: string}): Observable<any> {
		if (credentials.email !== 'gombate@yahoo.com' || credentials.password !== 'password') {
			return of(null);
		}

		// replicate a backend auth service
		return this.http.get('https://randomuser.me/api/').pipe(
			take(1),
			map(res => {
				// tslint:disable-next-line: max-line-length
				return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvbWJhdGVAeWFob28uY29tIiwiZmlyc3RfbmFtZSI6IkJlbiIsImxhc3RfbmFtZSI6IlN0aWxsZXIifQ._HVnO5zwR5mep1JQ3sgiVAn_VnZKCsbTlwtIhDi75cA`;
			}),
			switchMap(token => {
				const decoded = helper.decodeToken(token);
				console.log('login decoded: ', decoded);
				this.userData.next(decoded);

				const storageObs = from(this.storage.set(TOKEN_KEY, token));
				return storageObs;
			})
		);
	}

	getUser() {
		return this.userData.getValue();
	}

	logout() {
		this.storage.remove(TOKEN_KEY).then(() => {
			this.router.navigateByUrl('/');
			this.userData.next(null);
		});
	}

}
