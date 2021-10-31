import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FIND_ALL_IMG_BY_ID } from '../constants';
import { API_GATEWAY_URI } from '../../constants/common-constant';
import { AuthService } from '../login-service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    public findAllImageByUserId(userId: string, page: number, size: number): Promise<any> {
        let url = API_GATEWAY_URI + FIND_ALL_IMG_BY_ID + `?userId=${userId}&page=${page}&size=${size}`;
        let httpOption = { headers: this.authService.getAuthHeader()};
        return this.http.get(url , httpOption).toPromise();
    }

}
