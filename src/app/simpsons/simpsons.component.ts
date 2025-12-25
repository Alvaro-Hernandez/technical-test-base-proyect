import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SimpsonsService,
  SimpsonsCharacter,
} from '../service/simpsons.service';

@Component({
  selector: 'app-simpsons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.scss',
})
export class SimpsonsComponent {
  page = signal(1);
  loadingList = signal(false);
  loadingDetail = signal(false);

  characters = signal<SimpsonsCharacter[]>([]);
  pagesTotal = signal(1);

  selected = signal<SimpsonsCharacter | null>(null);

  canPrev = computed(() => this.page() > 1);
  canNext = computed(() => this.page() < this.pagesTotal());

  constructor(private api: SimpsonsService) {
    this.loadPage();
  }

  loadPage() {
    this.loadingList.set(true);
    this.api.getAllCharacters(this.page()).subscribe({
      next: (res) => {
        this.characters.set(res.results);
        console.log(res);
        this.pagesTotal.set(res.pages);
      },
      error: () => {},
      complete: () => this.loadingList.set(false),
    });
  }

  prev() {
    if (!this.canPrev()) return;
    this.page.set(this.page() - 1);
    this.loadPage();
  }

  next() {
    if (!this.canNext()) return;
    this.page.set(this.page() + 1);
    this.loadPage();
  }

  select(id: number) {
    this.loadingDetail.set(true);
    this.api.getCharacterById(id).subscribe({
      next: (c) => {
        this.selected.set(c), console.log(c);
      },
      error: () => {},
      complete: () => this.loadingDetail.set(false),
    });
  }

  portraitUrl(imagePath?: string | null, size: string = '500') {
    if (!imagePath) return '';

    // Asegura que siempre empiece con "/"
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `https://cdn.thesimpsonsapi.com/${size}${path}`;
  }
}
