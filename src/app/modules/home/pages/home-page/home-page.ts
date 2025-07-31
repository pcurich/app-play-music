import { Component } from '@angular/core';
import { SideBar } from '@shared/components/side-bar/side-bar';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [SideBar, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
