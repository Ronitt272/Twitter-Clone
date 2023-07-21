import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:3000/";

  createTweet(tweet : any):Observable<any>{
   return this.http.post(this.baseUrl+"tweet",tweet,{withCredentials : true}); 
  }

  getTweets():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+`tweet/${sessionStorage.getItem("username")}`);
  }
}
