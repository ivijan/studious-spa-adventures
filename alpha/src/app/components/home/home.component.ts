import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { delay, first } from 'rxjs/operators';

import { User } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[] = [];
    currentUser: User | undefined;
    view: 'details' | 'list' = 'list';

    constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.pipe(first()).subscribe((data: Data) => {
            if (data.view && data.view === 'details') {
                this.view = 'details';
                this.currentUser = this.authenticationService.currentUserValue;
            }
        });
        if (this.currentUser) {
            this.loading = false;
            this.users = [this.currentUser];
        } else {
            this.userService.getAll().pipe(first(), delay(1000)).subscribe(users => {
                this.loading = false;
                this.users = users;
            });
        }
    }
}