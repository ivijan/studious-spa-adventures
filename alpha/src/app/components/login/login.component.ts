import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/interfaces/role.enum';
import { environment } from 'src/environments/environment';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.redirectToRole();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get controls() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.controls.username.value, this.controls.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // redirect to role url, or get return url from route parameters, or default to '/'
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    if (this.route.snapshot.queryParams['returnUrl']) {
                        this.router.navigate([returnUrl]);
                    } else {
                        this.redirectToRole(returnUrl);
                    }
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }

    redirectToRole(redirectTo = '/') {
        // if logged, redirect based on user role
        const currentUser = this.authenticationService.currentUserValue
        if (currentUser) {
            switch (currentUser?.role) {
                case Role.admin:
                    window.location.href = environment.adminAppUrl;
                    break;
                case Role.user:
                    window.location.href = environment.userAppUrl;
                    break;
                default:
                    this.router.navigate([redirectTo]);
                    break;
            }
        }
    }
}
