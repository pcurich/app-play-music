import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { PlayListBody } from "@shared/index";
import { Observable, of } from 'rxjs';
import { Search } from '../../components/search/search';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-history-page',
  imports: [PlayListBody, Search, CommonModule],
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.scss']
})
export class HistoryPage {
  private searchService = inject(SearchService);

  searchTerm = signal<string>('');
  listResults = signal<TrackModel[]>([]);
  isSearching = signal<boolean>(false);

  // ✅ Computed para validar término
  isValidTerm = computed(() => {
    const term = this.searchTerm().trim();
    console.log('🔴 Validando término de búsqueda:', term.length >= 3);
    return term.length >= 3;
  });
  canSearch = computed(() => this.isValidTerm() && !this.isSearching());

  showResults = computed(() =>
    this.isValidTerm() &&
    !this.isSearching() &&
    this.listResults().length > 0
  );

  showEmptyState = computed(() =>
    this.isValidTerm() &&
    !this.isSearching() &&
    this.listResults().length === 0
  );


  receiveData(event: string): void {
    console.log('🎁 Estoy en el padre jua jua...', event);

    // ✅ Solo actualizar el signal, el effect se encarga del resto
    this.searchTerm.set(event);

    if (this.isValidTerm()) {
      this.performSearch(event);
    } else {
      // Limpiar resultados si el término no es válido
      this.listResults.set([]);
      this.isSearching.set(false);
    }
  }

  private performSearch(term: string): void {
    this.isSearching.set(true);

    this.searchService.searchTracks$(term).subscribe({
      next: (results) => {
        this.listResults.set(results);
        this.isSearching.set(false);
      },
      error: (error) => {
        console.error('Search error:', error);
        this.listResults.set([]);
        this.isSearching.set(false);
      }
    });
  }

  // ✅ Método para limpiar búsqueda (usando isValidTerm)
  clearSearch(): void {
    this.searchTerm.set('');
    this.listResults.set([]);
    this.isSearching.set(false);
    // isValidTerm se actualiza automáticamente a false
  }
}

