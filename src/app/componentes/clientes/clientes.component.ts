import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { FlashMessageService } from 'angular2-flash-message';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor( 
    private clientesServicio: ClienteServicio,
    // private flashMessages: FlashMessageService
  ) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal () {
    let saldoTotal: number = 0;
    if ( this.clientes ) {
      this.clientes.forEach( 
        cliente => {
          saldoTotal += Number( cliente.saldo );
        }
      )
    }
    return saldoTotal;
  }

  agregar ( f : NgForm )  {
    if ( !f.valid ){
       // this.flashMessages.display( 'Por favor llena el formulario correctamente' )
       console.log( 'llena el pinche formulario wee' )
    } else {
      console.log( 'Agregar nuevo cliente ');
      this.clientesServicio.agregarCliente( f.value )
      this.clienteForm.resetForm();
      this.cerrarModal();
      
    }
  }
  private cerrarModal () {
    this.botonCerrar.nativeElement.click();
  }
}
