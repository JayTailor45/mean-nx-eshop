import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BannerComponent } from '@eshop/ui';
import { UsersService } from '@eshop/users';


@Component({
  standalone: true,
  imports: [RouterModule, HomePageComponent, HeaderComponent, FooterComponent, BannerComponent],
  selector: 'client-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  #userService = inject(UsersService);

  ngOnInit() {
    this.#userService.initAppSession();
  }
}
