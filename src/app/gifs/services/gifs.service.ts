import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'TNMKJZg1udtKvQnadShx5nR8mMGzydc6';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
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

    this.results = JSON.parse(localStorage.getItem('lastResults')!) || [];
  }

  searchGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe((resp)=> {
        console.log(resp);
        this.results = resp.data;
        localStorage.setItem('lastResults', JSON.stringify(this.results));
      }) 
  }

  
}
