import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidosApiService } from '../pedidosapi.service';
import { Router, RouterLink } from '@angular/router';
import { PedidosFilterPipe } from '../pedidos-filter.pipe';
import { CommonModule } from '@angular/common';
import { PedidoNeg } from '../pedidosNEG';

@Component({
  imports: [FormsModule, RouterLink, PedidosFilterPipe, CommonModule],
  selector: 'app-pedidos',
  templateUrl: './pedidos.html',
})
export class Pedidos implements OnInit {
  listFilter: string = '';
  dataSource: PedidoNeg[] = [];

  constructor(public pedidosService: PedidosApiService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (response: any) => {
        this.dataSource = response.pedidos;
      },
      error: (error) => {
        console.error('Error al consultar el API:', error);
      }
    });
  }
}