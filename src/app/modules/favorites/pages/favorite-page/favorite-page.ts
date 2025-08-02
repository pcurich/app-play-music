import { Component } from '@angular/core';
import { PlayListBody } from "@shared/index";
import { PlayListHeader } from "@shared/index";

@Component({
  selector: 'app-favorite-page',
  imports: [PlayListBody, PlayListHeader],
  standalone: true,
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss'
})
export class FavoritePage {

}
