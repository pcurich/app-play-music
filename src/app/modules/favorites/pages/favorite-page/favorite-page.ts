import { Component } from '@angular/core';
import { PlayListBody } from "@shared/components/play-list-body/play-list-body";
import { PlayListHeader } from "@shared/components/play-list-header/play-list-header";

@Component({
  selector: 'app-favorite-page',
  imports: [PlayListBody, PlayListHeader],
  standalone: true,
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss'
})
export class FavoritePage {

}
