import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'twitterclone';
  constructor(private userService : UserService, private router : Router) {};

  onLogout()
  {
    this.userService.logout().subscribe(result=>{
    this.router.navigate(['/login']);
    },error=>{
      alert(error.error);
    })

    sessionStorage.removeItem("username"); //corresponding to username key, the key-value pair is removed from session storage, as the user has logged out, and is no longer a part of the session
  }
  isLoggedIn(){
    if(sessionStorage.getItem("username")){
      return true;
    }
    return false;
  }
}
