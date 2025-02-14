import { Component } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PizzaOfTheDayComponent } from './pizza-of-the-day/pizza-of-the-day.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, PizzaOfTheDayComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Padre-Ginos';
}
