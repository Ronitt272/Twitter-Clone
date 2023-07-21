import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // injecting Userservice into signup component
  constructor(private userservice : UserService, private router : Router) {}
  onSubmit(form : NgForm)
  {
    // console.log(form);
    // console.log("Username: ", form.form.value.username);
    // console.log("Email: ", form.form.value.email);
    // console.log("Password: ", form.form.value.password);
    // the subscribe() is only visible on observables
    this.userservice.signup({'username' : form.form.value.username, 'email' : form.form.value.email, 'password' : form.form.value.password}).subscribe(
      result=>{
        this.router.navigate(['/home']);
        alert(`You're successfully logged in !`);
        sessionStorage.setItem("username", result);
      }, error=>{
        alert(error.error);
      });
  }
}
