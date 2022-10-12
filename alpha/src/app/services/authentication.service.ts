import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | undefined>;
    public currentUser: Observable<User | undefined>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User | undefined>(this.getLoggedUser());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | undefined {
        return this.currentUserSubject.value;
    }

    getLoggedUser(): User {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map((user: User) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(undefined);
    }
}