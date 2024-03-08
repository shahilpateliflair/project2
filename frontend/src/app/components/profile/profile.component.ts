import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { emitters } from 'src/app/emitters/emitter';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authenticated= false;
  message='';
  // router: any;

constructor(private http:HttpClient,private router:Router,private plateformlocation:PlatformLocation){
  history.pushState(null, '', location.href);
  this.plateformlocation.onPopState(() => {
    history.pushState(null, '', location.href);
  });
}
  ngOnInit(): void {
    emitters.authEmitter.emit(this.authenticated);
    this.http.get("http://localhost:5000/profile",{
      
        withCredentials:true
      })
      .subscribe((res:any)=>{
        this.message=`${res.username}`;
        emitters.authEmitter.emit(true)
      },(err)=>{
        this.message="you are not log in"
        emitters.authEmitter.emit(false)
        this.router.navigate(['/login'])
      })

      emitters.authEmitter.subscribe((auth:boolean)=>{
        this.authenticated=auth;
      })

  }
  logout() {
    this.http.post("http://localhost:5000/logout", {}, { withCredentials: true })
      .pipe(
        finalize(() => {
          this.authenticated = false;
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  
    }

 
  


}