import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {

}
