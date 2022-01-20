import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials = {
		email: '',
		password: '',
	};

	constructor(
		private auth: AuthService,
		private alertCtrl: AlertController,
		private router: Router
	) {}

	ngOnInit() {}

	login() {
		this.auth.login(this.credentials).subscribe(async (res) => {
			if (res) {
				this.router.navigateByUrl('/members');
			} else {
				const alert = await this.alertCtrl.create({
					header: 'Login Failed',
					message: 'User credentials are incorrect',
					buttons: ['OK'],
				});
				await alert.present();
			}
		});
	}
}
