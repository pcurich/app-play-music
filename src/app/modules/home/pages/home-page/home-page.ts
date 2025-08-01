import { Component } from '@angular/core';
import { SideBar } from '@shared/components/side-bar/side-bar';
import { RouterModule } from "@angular/router";
import { MediaPlayer } from "@shared/components/media-player/media-player";

@Component({
  selector: 'app-home-page',
  imports: [SideBar, RouterModule, MediaPlayer],
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
