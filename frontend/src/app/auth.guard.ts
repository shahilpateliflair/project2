import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
@Injectable({
  providedIn: 'root'
})

  export class AuthGuard  {
    canActivate() {
     
    }

  }
