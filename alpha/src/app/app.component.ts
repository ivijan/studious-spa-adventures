import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './interfaces/user.interface';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser!: User | undefined;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x: User | undefined) => this.currentUser = x);
  }
  
  ngOnInit() {
    const user = this.authenticationService.getLoggedUser();
    window.parent.postMessage({"user": user}, environment.adminAppUrl);
    window.parent.postMessage({"user": user}, environment.userAppUrl);
  }
}
