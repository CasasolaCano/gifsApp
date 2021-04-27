import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'TNMKJZg1udtKvQnadShx5nR8mMGzydc6';
  private _history: string[] = [];

  // TODO: 
  public results: any[] = [];

 
  get history() {
    return [...this._history];
  }

  constructor(private http:HttpClient){}

  searchGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=TNMKJZg1udtKvQnadShx5nR8mMGzydc6&q=${query}&limit=10`)
      .subscribe((resp : any)=> {
        console.log(resp);
        this.results = resp.data;
      }) 
  }
}
