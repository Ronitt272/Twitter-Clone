import { Component } from '@angular/core';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private tweetService : TweetService) {}
  tweetData = "";
  onTweet(){
    let observable = this.tweetService.createTweet({
      'tweetdata' : this.tweetData,
      'likes' : 0,
      "username" : sessionStorage.getItem("username")
    });
    observable.subscribe(result=>{
      alert('tweet created successfully!');
    },
    error=>{
      alert(error.error);
    })
  }
  
}
