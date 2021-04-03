import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero-models/hero';
import { HEROES } from '../hero-models/mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  public heroes = HEROES;
  public hero: Hero = {
    id: 1,
    name: "Windstorm"
  };
  selectedHero?:Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
