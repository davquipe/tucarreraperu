import { Component } from '@angular/core';
import { SeoService } from './services/seo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tucarreraperu';
  constructor(
    private seoService: SeoService
  ) {
    this.seoService.generateTags();
  }
}
