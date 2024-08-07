import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedModule} from "../../modules/shared/shared.module";
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        SharedModule,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    subscriptions: Subscription[] = [];

    routeSelected: number = -1;
    dataRoutes = [
        {routeName: 'Dashboard', icon: 'dashboard', routeLink: '/dashboard'},
        {routeName: 'Ebooks', icon: 'book', routeLink: '/ebooks'},
        {routeName: 'Authors', icon: 'person', routeLink: '/authors'},
        {routeName: 'Categories', icon: 'category', routeLink: '/categories'},
        {routeName: 'User', icon: 'people', routeLink: '/user'},
    ];

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.updateRouteSelected(this.router.url);

    }

    navigate(index: number) {
        this.router.navigate(['main/' + this.dataRoutes[index].routeLink]).then(
            () => {
                this.routeSelected = index;
            }
        );
    }

    ngAfterViewInit(): void {
        this.subscriptions.push(
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((event) => {
                this.updateRouteSelected((event as NavigationEnd).urlAfterRedirects);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    private updateRouteSelected(url: string): void {
        if (url.includes('dashboard')) {
            this.routeSelected = 0;
        } else if (url.includes('ebooks')) {
            this.routeSelected = 1;
        } else if (url.includes('authors')) {
            this.routeSelected = 2;
        } else if (url.includes('categories')) {
            this.routeSelected = 3;
        } else if (url.includes('user')) {
            this.routeSelected = 4;
        } else {
            this.routeSelected = -1;
        }
    }

}
