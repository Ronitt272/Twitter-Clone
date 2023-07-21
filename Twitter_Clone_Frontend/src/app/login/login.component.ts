import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // form is the name of the object which angular has created for me in the template and I've passed on ngSumbit
  constructor(private userService : UserService, private router : Router) {}
  onSubmit(form : NgForm)
  {
    // console.log(form);
    // console.log("Username: ", form.form.value.username);
    // console.log("Email: ", form.form.value.email);
    // console.log("Password: ", form.form.value.password);
    this.userService.login(
      {'username' : form.form.value.username,
       'email' : form.form.value.email,
      'password' : form.form.value.password
      }).subscribe(result=>{
        // now we are routing the user to home section after successful authorization
      sessionStorage.setItem("username", result.username);
      this.router.navigate(['/home']);
    },
    error=>{
      alert(error.error);
      alert('your Username or Email or Password is incorrect.')
    });
    
  }
}
