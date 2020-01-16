import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../_models/registerModel';


@Injectable({ providedIn: 'root' })
export class UserService {
    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    httpOptions = {
        headers: this.headers
    };

    register(user: RegisterModel) {
        return this.http.post<any>(`${environment.api_url}/users/register`, user);
    }
}