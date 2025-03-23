import { Component } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
