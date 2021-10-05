import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { first } from 'rxjs/operators';
import { Role } from 'src/app/interfaces/role.enum';
import { User } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({ templateUrl: 'redirect.component.html' })
export class RedirectComponent implements OnInit {
    currentUser!: User | null;

    constructor(private router: Router, private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.activatedRoute.queryParams.pipe(first()).subscribe((params: Params) => {
            if (params.role && params.role === this.currentUser?.role ) {
                switch (params.role) {
                    case Role.admin:
                        window.location.href = environment.adminAppUrl;
                        break;
                    case Role.user:
                        window.location.href = environment.userAppUrl;
                        break;
                    default:
                        this.router.navigate(['/']);
                        break;
                }
            }
            this.router.navigate(['/']);
        });
    }
}
