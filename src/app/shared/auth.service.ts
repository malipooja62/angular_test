import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private register = "http://localhost:3000/api/register";
  private login = "http://localhost:3000/api/login";

  constructor(private http:HttpClient,private router : Router) {
    
  } 

  loginUser(user: any)
{
  return this.http.post(this.login,user);
}
loggedIn()
{
  return !!localStorage.getItem('token');
}

logoutUser()
{
  localStorage.removeItem('token');
  //this.router.navigate('/events');
}

getToken()
{
  return localStorage.getItem('token');
}


}
