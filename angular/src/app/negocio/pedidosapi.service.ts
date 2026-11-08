import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoNeg } from './pedidosNEG';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PedidosApiService {
    constructor(private http: HttpClient) { }

    public getPedidos(): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:5000/api/pedidos/');
    }

    public getPedido(id: number): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:5000/api/pedidos/${id}`);
    }

    public agregarNuevoPedido(datos: PedidoNeg): Observable<any> {
        return this.http.post('http://127.0.0.1:5000/api/pedidos/', datos);
    }

    public modificarPedido(id: number, datos: PedidoNeg): Observable<any> {
        return this.http.put('http://127.0.0.1:5000/api/pedidos/' + id, datos);
    }

    public eliminaPedido(id: number): Observable<any> {
        return this.http.delete<any>('http://127.0.0.1:5000/api/pedidos/' + id);
    }
}