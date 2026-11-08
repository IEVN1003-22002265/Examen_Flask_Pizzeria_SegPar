import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'negocio',
        children: [
            {
                path: 'agregar',
                loadComponent: () =>
                    import('./negocio/agregar/agregar').then(
                        (c) => c.AgregarPedido
                    ),
            },
            {
                path: 'pedidos',
                loadComponent: () =>
                    import('./negocio/pedidos/pedidos').then(
                        (c) => c.Pedidos
                    ),
            },
            {
                path: 'reporte',
                loadComponent: () =>
                    import('./negocio/reporte/reporte').then(
                        (c) => c.ReportePedidos
                    ),
            },
            {
                path: 'eliminar/:idpedido',
                loadComponent: () =>
                    import('./negocio/eliminar/eliminar').then(
                        (c) => c.EliminarPedido
        ),
},
        ]
    },

    { path: '', redirectTo: "negocio/agregar", pathMatch: "full" },
    { path: '**', redirectTo: 'negocio/agregar' },
];