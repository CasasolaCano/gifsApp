import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'TNMKJZg1udtKvQnadShx5nR8mMGzydc6';
  private _history: string[] = [];

  // TODO: 
  public results: Gif[] = [];

 
  get history() {
    return [...this._history];
  }

  constructor(private http:HttpClient){
    // localStorage.getItem('history');

    // this._history = JSON.parse(localStorage.getItem('history')!) || [];

    if(localStorage.getItem('history')) {
      this._history = JSON.parse(localStorage.getItem('history')!);
    }
  }

  searchGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp)=> {
        console.log(resp);
        this.results = resp.data;
      }) 
  }
}
