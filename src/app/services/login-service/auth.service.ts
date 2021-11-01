import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/common-constant';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private uri = environment.API_GATEWAY_URI + environment.API_AUTHORIZATION_PATH;
    public headers: HttpHeaders | undefined;

    constructor(private http: HttpClient) {

    }

    public doLogin(username: string, password: string): Promise<void> {
        localStorage.removeItem(ACCESS_TOKEN);
        // Define the parameter and header options
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + window.btoa(environment.APPLICATION_NAME + ":" + "password"),
            }),
            params: new HttpParams().set("username", username).set("password", password).set("grant_type", "password"),
        };

        return new Promise((resolve, reject) => {
            this.http.post<any>(this.uri + "/oauth/token", null, httpOptions).subscribe(
                (data: any) => {
                    /** Set access token and refresh token to storage, set information user */
                    localStorage.setItem(ACCESS_TOKEN, data.access_token);
                    localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
                    resolve(data);
                },
                (error: any) => {
                    reject(error);
                }
            );
        });
    }

    /** Find access token from storage */
    public findAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    /** Find refesh token from storage */
    public findRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN);
    }

    /** Verify if user has already login the system */
    public isAuthorized(): boolean {
        let authToken = localStorage.getItem(ACCESS_TOKEN);
        /** TODO: wait API from BE to check valid token */
        return authToken !== null ? true : false;
    }

    /** Do logout the system and redirect to login page*/
    public doLogout(): void {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }

    public getAuthHeader(): HttpHeaders {
        return new HttpHeaders({
            "Authorization": `Bearer ${this.findAccessToken()}`,
        });
    }
}
