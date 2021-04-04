import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

import { Hero } from "./hero-models/hero"; 

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
  
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('HeroService: fetched heroes successfully')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )
  }

  public getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

    public updateHero(hero: Hero): Observable<any>{
      return this.http.put<Hero>(this.heroesUrl,hero, this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<Hero>(`updateHero`))
      )
    }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  /** DELETE: delete the hero from the server */
  public deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  public searchHeroes( term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of ([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap( heroes => heroes.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHero',[]))
    )
  }
  
  private log(message: string):void {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  
}
