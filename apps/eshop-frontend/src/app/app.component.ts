import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BannerComponent } from '@eshop/ui';


@Component({
  standalone: true,
  imports: [RouterModule, ProductListComponent, HomePageComponent, HeaderComponent, FooterComponent, BannerComponent],
  selector: 'client-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eshop-frontend';
}
