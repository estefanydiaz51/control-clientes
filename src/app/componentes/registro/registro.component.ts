import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;
  constructor(
    private loginService: LoginService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  registro() {
    this.loginService.registrarse( this.email, this.password)
    .then( res=> {
      this.router.navigate(['/']);
    })
    .catch( error => {
      console.log( 'ERROR EN EL LOGIN' )
    });

  }

}
