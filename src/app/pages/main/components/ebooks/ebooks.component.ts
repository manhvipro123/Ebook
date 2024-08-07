import { Component } from '@angular/core';
import { ExamplePdfViewerComponent } from '../../../../example-pdf-viewer/example-pdf-viewer.component';

@Component({
  selector: 'app-ebooks',
  standalone: true,
  imports: [ExamplePdfViewerComponent],
  templateUrl: './ebooks.component.html',
  styleUrl: './ebooks.component.scss',
})
export class EbooksComponent {}
