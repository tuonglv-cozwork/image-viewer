import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceGuard implements CanActivate {
	constructor(private router: Router, public authService: AuthService) { }

	/** Check authrization to can active router link*/
	public canActivate(): boolean {
		const isAuthorized = this.authService.isAuthorized();

		if (isAuthorized) {
			/** Logged in so return true */
			return true;
		}

		/**  Not active, so redirect to login page to log in*/
		this.authService.doLogout();
		this.router.navigateByUrl("/login");
		return false;
	}

}
