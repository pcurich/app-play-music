import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SideBar } from '@shared/index';
import { MediaPlayer } from "@shared/index";

@Component({
  selector: 'app-home-page',
  imports: [SideBar, RouterModule, MediaPlayer],
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
