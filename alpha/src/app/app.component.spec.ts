import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { User } from './interfaces/user.interface';
import { AuthenticationService } from './services/authentication.service';

const TEST_USER: User = { id: 1, username: 'john.bravo@admin.com', firstName: 'John', lastName: 'Bravo', role: 'admin'};
class MockAuthenticationService {
  public currentUser = of(TEST_USER);
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should be unlogged by default`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentUser).toBe(TEST_USER);
  });

  it('should have nav-bar rendered', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.nav-item.nav-link').length).toEqual(2);
  });
});
