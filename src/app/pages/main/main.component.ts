import {Component} from '@angular/core';
import {SharedModule} from "../../shares/modules/shared/shared.module";
import {NavbarComponent} from "../../shares/components/navbar/navbar.component";
import {SidebarComponent} from "../../shares/components/sidebar/sidebar.component";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        SharedModule,
        NavbarComponent,
        SidebarComponent
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {


    constructor() {
    }


}


