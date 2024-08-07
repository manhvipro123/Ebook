import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../shares/modules/shared/shared.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrxs/auth/auth.state';
import * as AuthActions from '../../ngrxs/auth/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  value = '';
  @ViewChild('slideBox') slideBox: ElementRef | undefined;
  @ViewChild('goRight') goRight: ElementRef | undefined;
  @ViewChild('goLeft') goLeft: ElementRef | undefined;
  @ViewChild('topLayer') topLayer: ElementRef | undefined;

  email = '';
  password = '';

  isSignInWithGoogle = true;
  isLoadingSignIn = false;

  subscriptions: Subscription[] = [];

  constructor(
    private renderer: Renderer2,
    private store: Store<{ auth: AuthState }>,
  ) {}

  ngAfterViewInit(): void {
    if (this.goRight && this.goLeft && this.slideBox && this.topLayer) {
      console.log('Elements initialized:', {
        goRight: this.goRight,
        goLeft: this.goLeft,
        slideBox: this.slideBox,
        topLayer: this.topLayer,
      });
      this.renderer.listen(this.goRight.nativeElement, 'click', () => {
        console.log('goRight clicked');
        this.renderer.addClass(this.slideBox!.nativeElement, 'animate-right');
        this.renderer.addClass(
          this.topLayer!.nativeElement,
          'animate-top-layer-right',
        );
        this.renderer.removeClass(this.slideBox!.nativeElement, 'animate-left');
        this.renderer.removeClass(
          this.topLayer!.nativeElement,
          'animate-top-layer-left',
        );
      });

      this.renderer.listen(this.goLeft.nativeElement, 'click', () => {
        console.log('goLeft clicked');
        this.renderer.addClass(this.slideBox!.nativeElement, 'animate-left');
        this.renderer.addClass(
          this.topLayer!.nativeElement,
          'animate-top-layer-left',
        );
        this.renderer.removeClass(
          this.slideBox!.nativeElement,
          'animate-right',
        );
        this.renderer.removeClass(
          this.topLayer!.nativeElement,
          'animate-top-layer-right',
        );
      });
    } else {
      console.error('One or more elements are not initialized');
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth', 'loading').subscribe((loading) => {
        this.isLoadingSignIn = loading;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  signInWithStaticUser() {
    this.store.dispatch(
      AuthActions.signInWithStaticUser({
        email: this.email,
        password: this.password,
      }),
    );
  }
}
