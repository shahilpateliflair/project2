import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
 form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      fullName: '',
      email: '',
      password: '',
    });
  }
  registration() :void{
    let user= this.form.getRawValue();
    console.log(user);

    if(user.username== ''|| user.fullName==''|| user.email==''|| user.password=='' ){
      Swal.fire("please enter all the fields","error")
    }else{
      this.http.post("http://localhost:5000/register",user,{
        withCredentials:true
      })
      .subscribe(()=>this.router.navigate(['login']),(err)=>{
Swal.fire("Error",err.error.message,"error")
      })
    }
  }
}
