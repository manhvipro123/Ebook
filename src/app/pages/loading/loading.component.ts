import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../shares/modules/shared/shared.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrxs/auth/auth.state';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe(async (idToken) => {
        if (idToken == '') {
          await this.router.navigate(['/login']);
          console.log('User is not signed in');
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
