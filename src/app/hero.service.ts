import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from "./hero-models/hero";
import { HEROES } from "./hero-models/mock-heroes";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  
  public getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
