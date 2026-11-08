import { Pipe, PipeTransform } from '@angular/core';
import { PedidoNeg } from './pedidosNEG';

@Pipe({
  name: 'pedidosFilter',
  standalone: true,
})
export class PedidosFilterPipe implements PipeTransform {
  transform(value: PedidoNeg[], args: string): PedidoNeg[] {
    let filter: string = args ? args.toLocaleLowerCase().trim() : '';
    
    if (!filter) {
      return value;
    }

    return value.filter((pedido: PedidoNeg) => {
      const fecha = pedido.fechaCompra ? pedido.fechaCompra.toLocaleLowerCase() : '';
      const nombre = pedido.nombreCompleto ? pedido.nombreCompleto.toLocaleLowerCase() : '';
      
      return fecha.includes(filter) || nombre.includes(filter);
    });
  }
}