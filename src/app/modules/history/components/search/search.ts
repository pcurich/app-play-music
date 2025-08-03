import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class Search implements OnInit {

  @Output() onSearch: EventEmitter<string> = new EventEmitter()

  src: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string): void {
    this.onSearch.emit(term);
    console.log('🔴 Llamamos a nuestra API HTTP GET---> ', term);
  }

}
