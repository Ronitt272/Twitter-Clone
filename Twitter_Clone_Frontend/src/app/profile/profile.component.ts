import { Component } from '@angular/core';
import { TweetService } from '../tweet.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  tweets:any[] = [];
  user : any;
  constructor(private tweetService : TweetService, private userService : UserService) {
    this.getTweets();
    this.getUser();
  }

  getTweets()
  {
    this.tweetService.getTweets().subscribe(result=>{
      this.tweets = result;
    },error=>{
      alert(error.error);
    })
  }
  getUser(){
    this.userService.getUserInformation(sessionStorage.getItem("username")).subscribe(result=>{
      this.user = result;
    },
    error=>{
      alert(error.error);
    });
  }

  sameUser(username : string){
    return username === sessionStorage.getItem("username") ? true : false;
  }
}
