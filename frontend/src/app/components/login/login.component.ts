import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth.service';
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(  private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private AuthService:AuthService,
    private plateformlocation:PlatformLocation
    ){
      history.pushState(null, '', location.href);
  this.plateformlocation.onPopState(() => {
    history.pushState(null, '', location.href);
  });
    }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        username: '',
        password: '',
      });
    }

  login(){
    let user= this.form.getRawValue();
    console.log(user);
    
if (!user.username || !user.password) {
  Swal.fire("Please enter both username and password", "error");
} else {
  this.http.post("http://localhost:5000/login", user, {
    withCredentials: true
  })
  .subscribe(
    (response) => {
      // console.log(response);
      console.log('Full response:', response);
      // Redirect to the profile page
      this.router.navigate(['/profile']);
    },
    (err) => {
      console.error(err);
      Swal.fire("Error", err.error.message || "An error occurred", "error");
    }
    )
}
    }
  }
  





 




  
