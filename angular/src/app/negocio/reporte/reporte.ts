import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PedidosApiService } from '../pedidosapi.service';
import { PedidosFilterPipe } from '../pedidos-filter.pipe';


@Component({
  selector: 'app-reporte-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PedidosFilterPipe], 
  templateUrl: './reporte.html',
})
export class ReportePedidos implements OnInit {
  dataSource: any[] = [];
  listFilter: string = '';
  totalVentasFiltradas: number = 0;

  constructor(public pedidosService: PedidosApiService) {}

  ngOnInit(): void {
    this.cargarDatosReporte();
  }

  cargarDatosReporte(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (response: any) => {
        
        this.dataSource = Array.isArray(response) ? response : (response.pedidos || []);
        this.calcularSumaTotal();
      },
      error: (error) => {
        console.error('Error al cargar reporte:', error);
      }
    });
  }

 
  calcularSumaTotal(): void {
    
    const filtrados = this.dataSource.filter(pedido => {
      if (!this.listFilter) return true;
      const filtro = this.listFilter.toLowerCase();
      const fecha = (pedido.fechaCompra || '').toLowerCase();
      const cliente = (pedido.nombreCompleto || '').toLowerCase();
      return fecha.includes(filtro) || cliente.includes(filtro);
    });


    this.totalVentasFiltradas = filtrados.reduce((acc, curr) => acc + (Number(curr.totalPedido) || 0), 0);
  }
}