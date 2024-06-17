import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'client-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
})
export class NavComponent {

}
