import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login-service/auth.service';
import { USER_ID } from '../../constants/common-constant';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router,) { }

    ngOnInit(): void {
    }

    public onSubmit(username: any, password: any): void {
        this.authService.doLogin(username.value, password.value).then((rs: any) => {
            this.router.navigateByUrl("/home");
            localStorage.setItem(USER_ID, rs.user_id);
        }).catch((err) => {
            console.log(err);
        });
    }

}
