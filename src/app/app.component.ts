import { Component, OnInit } from '@angular/core';
import { SharedModule } from './shares/modules/shared/shared.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './ngrxs/auth/auth.state';
import * as AuthActions from './ngrxs/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title: string = 'Ebook';

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{ auth: AuthState }>,
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        this.store.dispatch(AuthActions.storeIdToken({ idToken: token.token }));
      } else {
        await this.router.navigate(['/loading']);
        console.log('User is not exist');
      }
    });
    this.store.select('auth', 'idToken').subscribe(async (idToken) => {
      if (idToken != '') {
        const navigationExtras: NavigationExtras = {
          replaceUrl: true,
        };
        console.log('User is signed in');
        this.router.navigate(['/main'], navigationExtras).then();
      }
    });
  }
}
