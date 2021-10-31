import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APPLICATION_NAME, API_GATEWAY_URI, API_AUTHORIZATION_PATH } from '../../constants/common-constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly ACCESS_TOKEN = "ACCESS_TOKEN";
    private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
    private uri = API_GATEWAY_URI + API_AUTHORIZATION_PATH;
    public headers: HttpHeaders | undefined;

    constructor(private http: HttpClient) {

    }

    public doLogin(username: string, password: string): Promise<void> {
        localStorage.removeItem(this.ACCESS_TOKEN);
        // Define the parameter and header options
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + window.btoa(APPLICATION_NAME + ":" + "password"),
            }),
            params: new HttpParams().set("username", username).set("password", password).set("grant_type", "password"),
        };

        return new Promise((resolve, reject) => {
            this.http.post<any>(this.uri + "/oauth/token", null, httpOptions).subscribe(
                (data: any) => {
                    /** Set access token and refresh token to storage, set information user */
                    localStorage.setItem(this.ACCESS_TOKEN, data.access_token);
                    localStorage.setItem(this.REFRESH_TOKEN, data.refresh_token);
                    resolve(data);
                },
                (error: any) => {
                    reject(error);
                }
            );
            // this.http.post<any>(this.uri + "/oauth/token", null, httpOptions).toPromise().then((data) => {
            //     localStorage.setItem(this.ACCESS_TOKEN, data.access_token);
            //     localStorage.setItem(this.REFRESH_TOKEN, data.refresh_token);
            //     resolve(data);
            // }).catch((err) => {
            //     console.log(err);
            //     reject(err);
            // })
        });
    }

    /** Find access token from storage */
    public findAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    /** Find refesh token from storage */
    public findRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    /** Verify if user has already login the system */
    public isAuthorized(): boolean {
        let authToken = localStorage.getItem(this.ACCESS_TOKEN);
        /** TODO: wait API from BE to check valid token */
        return authToken !== null ? true : false;
    }

    /** Do logout the system and redirect to login page*/
    public doLogout(): void {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }

    public getAuthHeader(): HttpHeaders {
        return new HttpHeaders({
            "Authorization": `Bearer ${this.findAccessToken()}`,
        });
    }
}
