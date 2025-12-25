import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SimpsonsCharacter {
  id: number;
  name: string;
  age: number | null;
  birthdate: string | null;
  gender: string | null;
  occupation: string | null;
  portrait_path: string | null;
  phrases: string[];
  status: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class SimpsonsService {
  private readonly baseUrl = 'https://thesimpsonsapi.com/api';

  constructor(private http: HttpClient) {}

  /** Trae la página actual de personajes (20 por página). */
  getAllCharacters(
    page: number = 1
  ): Observable<PaginatedResponse<SimpsonsCharacter>> {
    return this.http.get<PaginatedResponse<SimpsonsCharacter>>(
      `${this.baseUrl}/characters?page=${page}`
    );
  }

  /** Trae un personaje por id. */
  getCharacterById(id: number): Observable<SimpsonsCharacter> {
    return this.http.get<SimpsonsCharacter>(`${this.baseUrl}/characters/${id}`);
  }

  private readonly baseUrl2 = 'https://rickandmortyapi.com/api/character';
  getAllCharacters2(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/?page=${page}`);
  }
}
