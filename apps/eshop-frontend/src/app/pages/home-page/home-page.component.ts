import { Component } from '@angular/core';
import { BannerComponent } from '@eshop/ui';
import { CategoriesBannerComponent } from '@eshop/products';

@Component({
  selector: 'client-home-page',
  standalone: true,
  imports: [
    BannerComponent,
    CategoriesBannerComponent
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

}
