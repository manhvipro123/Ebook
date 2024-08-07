import {Component} from '@angular/core';
import {SharedModule} from "../../../../shares/modules/shared/shared.module";

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

}
