import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Signal para trackear requests activas
  private activeRequests = signal<Set<string>>(new Set());

  // Computed signal para saber si hay loading activo
  isLoading = computed(() => this.activeRequests().size > 0);

  // Signal para el número de requests activas
  requestCount = computed(() => this.activeRequests().size);

  setLoading(loading: boolean, requestId: string): void {
    const current = this.activeRequests();
    const updated = new Set(current);

    if (loading) {
      updated.add(requestId);
    } else {
      updated.delete(requestId);
    }

    this.activeRequests.set(updated);
  }

  // Método para forzar reset (útil para casos edge)
  resetLoading(): void {
    this.activeRequests.set(new Set());
  }

  // Verificar si una request específica está cargando
  isRequestLoading(requestId: string): boolean {
    return this.activeRequests().has(requestId);
  }
}
