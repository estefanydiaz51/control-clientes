import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

  constructor( 
    private clientesServicio: ClienteServicio,
    // private flashMessages: FlashMessageService
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(
      cliente => {
        this.cliente = cliente;
      }
    )
  }

  eliminar () {
    if ( confirm('Seguro que desea eliminar el cliente ') ){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/'])
    }

  }

  guardar ( f: NgForm ) {
    if ( !f.valid ) {
      console.log( 'Por favor llena el formulario correctamente' )
      /* this.flashMessages.show( 'POR FAVOR LLENA el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      }) */
    } else {
      f.value.id = this.id;
      // modificamos el cliente 
      this.clientesServicio.modificarCliente( f.value )
      this.router.navigate(['/']);
    }
  }

}
