import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadImageComponent } from '../../widget/dialog-upload-image/dialog-upload-image.component';
import { AuthService } from '../../services/login-service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

    constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    public onUpLoadImage(): void {
        this.dialog.open(DialogUploadImageComponent, {
            autoFocus: false,
        });
    }

    public onLogOut(): void {
        this.authService.doLogout();
        this.router.navigateByUrl("/");
    }
}
