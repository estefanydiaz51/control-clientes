import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  loggedInUser: string;
  isLoggedIn: boolean;
  permitirRegistro: boolean | any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionSevicio: ConfiguracionServicio
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if ( auth ) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email as string;
      }else {
        this.isLoggedIn = false;
      }
    });
    this.configuracionSevicio.getConfiguracion().subscribe(
      ( configuracion => {
        this.permitirRegistro = configuracion.permitirRegistro;
      })
    )
  }

  logout () {
    this.loginService.logoUt();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
