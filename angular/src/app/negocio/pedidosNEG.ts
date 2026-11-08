export interface PedidoNeg {
    idpedido?: number;
    nombreCompleto: string;
    direccion: string;
    telefono: string;
    fechaCompra: string;
    totalPedido: number;
}

export interface RespuestaPedidos {
    pedidos: PedidoNeg[];
    exito: boolean;
    mensaje: string;
}