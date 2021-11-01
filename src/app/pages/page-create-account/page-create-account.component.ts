import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ImageService } from '../../services/image-service/image.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-create-account',
    templateUrl: './page-create-account.component.html',
    styleUrls: ['./page-create-account.component.scss']
})
export class PageCreateAccountComponent implements OnInit {
    public genderList = [{
        id: 0,
        value : "Male"
    },{
        id: 1,
        value: "Female"
    }]
    public selectedGenderId: number = 0;
    public username = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required]);
    public firstName = new FormControl('', [Validators.required]);
    public lastName = new FormControl('', [Validators.required]);
    public email = new FormControl('', [Validators.required, Validators.email]);
    public dob = new FormControl('', [Validators.required]);
    public isSuccess: boolean | undefined;

    constructor(private imageService: ImageService, private router: Router) { }

    ngOnInit(): void {

    }

    public onSignUp(): void {
        if (this.username.valid && this.password.valid && this.firstName.valid && this.email.valid && this.lastName.valid && this.dob.valid) {
            let tempDate = new Date(this.dob.value);
            let month = tempDate.getMonth() < 10 ? "0" + tempDate.getMonth().toString() : tempDate.getMonth().toString();
            let day = tempDate.getDay() < 10 ? "0" + tempDate.getDay().toString() : tempDate.getDay().toString();
            let body = {
                username: this.username.value,
                password: this.password.value,
                first_name: this.firstName.value,
                last_name: this.lastName.value,
                email: this.email.value,
                dob: `${tempDate.getFullYear()}-${month}-${day}`,
                gender: this.selectedGenderId,
            }
            this.imageService.addNewAccount(body).then((data) => {
                console.log(data);
                this.isSuccess = true;
                this.username.setValue('');
                this.password.setValue('');
                this.firstName.setValue('');
                this.lastName.setValue('');
                this.email.setValue('');
                this.dob.setValue('');
            }).catch((err) => {
                console.log(err);
                this.isSuccess = false;
            })
        }
    }

    public onGoToLogin(): void {
        this.router.navigateByUrl("/login");
    }
}
