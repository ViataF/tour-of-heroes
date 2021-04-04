import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero-models/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  
  private getHeroes(): void{
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
