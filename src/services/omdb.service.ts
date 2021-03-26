import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Omdb} from "../entities/omdb";

@Injectable({
  providedIn: 'root'
})

export class OmdbService {
  apikey = "47535521"
  url = "http://www.omdbapi.com/"

  constructor(private http: HttpClient) {
  }

  getFilms(title: string): Observable<Omdb> {
    return this.http.get<Omdb>(this.url, {
      params: {
        t: title,
        apikey: this.apikey
      }
    });
  }
}
