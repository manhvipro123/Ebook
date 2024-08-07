import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isStaticUser = false;

  constructor(
    private store: Store<{ auth: AuthState }>,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'isStaticUser').subscribe((isStaticUser) => {
        this.isStaticUser = isStaticUser;
      }),
    );
  }

  logout() {
    if (this.isStaticUser) {
      this.router.navigate(['/login']).then(() => {
        this.store.dispatch(AuthActions.signOut());
      });
    } else {
      this.store.dispatch(AuthActions.signOut());
    }
  }

  openConfirmLogoutDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Logout',
        message: 'Are you sure you want to logout?',
      },
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        console.log('User confirmed logout');
        this.logout();
      }
    });
  }
}
