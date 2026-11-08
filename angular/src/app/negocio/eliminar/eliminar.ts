import { PedidoNeg } from '../pedidosNEG';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { PedidosApiService } from '../pedidosapi.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  selector: 'app-eliminar-pedido',
  templateUrl: './eliminar.html',
})
export class EliminarPedido implements OnInit {
  formulario!: FormGroup;
  idpedido: string = '';
  regPedido: PedidoNeg = {
    idpedido: 0,
    nombreCompleto: '',
    direccion: '',
    telefono: '',
    fechaCompra: '',
    totalPedido: 0
  };

  constructor(
    private route: ActivatedRoute,
    public pedidosService: PedidosApiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombreCompleto: [''],
      direccion: [''],
      telefono: [''],
      fechaCompra: [''],
      totalPedido: ['']
    });

    this.idpedido = this.route.snapshot.paramMap.get('idpedido') || '';

    this.pedidosService.getPedido(Number(this.idpedido)).subscribe({
      next: (response: any) => {
        if (response && response.pedido) {
          this.regPedido = response.pedido;
        }
      },
      error: (error) => {
        console.error('Error al consultar el pedido:', error);
      }
    });
  }

  bajaPedido(): void {
    const idNum = Number(this.idpedido);

    this.pedidosService.eliminaPedido(idNum).subscribe({
      next: (res) => {
        console.log("Pedido eliminado con exito", res);
        alert('Pedido eliminado correctamente');
        this.router.navigate(['/negocio/pedidos']);
      },
      error: (err) => {
        console.error("Error al eliminar el pedido:", err);
        alert('Error al intentar eliminar el pedido');
      }
    });
  }
}