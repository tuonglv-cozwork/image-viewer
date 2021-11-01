import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIND_ALL_IMG_BY_ID, UPLOAD_IMAGE, ADD_NEW_ACCOUNT } from '../constants';
import { AuthService } from '../login-service/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private httpOption: any;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.httpOption = { headers: this.authService.getAuthHeader() };
    }

    public findAllImageByUserId(userId: string, page: number, size: number): Promise<any> {
        let url = environment.API_GATEWAY_URI + FIND_ALL_IMG_BY_ID + `?userId=${userId}&page=${page}&size=${size}`;
        return this.http.get(url , this.httpOption).toPromise();
    }

    public uploadImage(formData: FormData): Promise<any> {
        let url = environment.API_GATEWAY_URI + UPLOAD_IMAGE;
        let httpOption = this.httpOption;
        httpOption["Content-Type"] = "multipart/form-data";
        return this.http.post(url, formData, httpOption).toPromise();
    }

    public addNewAccount(body: any): Promise<any> {
        let url = environment.API_GATEWAY_URI + ADD_NEW_ACCOUNT;
        return this.http.put(url, body).toPromise();
    }
}
