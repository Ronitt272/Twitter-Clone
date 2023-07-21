import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

     baseUrl = "http://localhost:3000/";
    // injecting http client class of http client module into constructor
    constructor(private http : HttpClient) { }

    signup(userdata : any):Observable<any>{
      return this.http.post(this.baseUrl+"signup",userdata);
    }

    login(userdata : any):Observable<any>{
      return this.http.post(this.baseUrl+'login',userdata);
    }
    logout():Observable<any>{
      return this.http.get(this.baseUrl+'logout');
    }
    getUserInformation(username: any):Observable<any>{
      return this.http.get(this.baseUrl+`user/${username}`);
    }
}
