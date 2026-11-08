import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PedidosApiService } from '../pedidosapi.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  selector: 'app-agregar-pedido',
  templateUrl: './agregar.html',
})
export class AgregarPedido implements OnInit {
  formGroup!: FormGroup;
  ingredientesGroup!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public pedidosService: PedidosApiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Grupo para los checkboxes de ingredientes
    this.ingredientesGroup = this.fb.group({
      jamon: [false],
      pina: [false],
      champiñones: [false]
    });

    // Añadimos Validators.required a cada campo obligatorio del formulario
    this.formGroup = this.fb.group({
      nombreCompleto: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaCompra: ['', Validators.required],
      tamano: ['Chica', Validators.required], 
      ingredientes: this.ingredientesGroup,
      numPizzas: [1, [Validators.required, Validators.min(1)]],
      totalPedido: [40, Validators.required] 
    });

    this.calcularTotal();
  }

  calcularTotal(): void {
    const valoresForm = this.formGroup.value;
    const tamano = valoresForm.tamano;
    const numPizzas = Number(valoresForm.numPizzas) || 1;

    let precioBase = 40; // Chica
    if (tamano === 'Mediana') precioBase = 80;
    if (tamano === 'Grande') precioBase = 120;

    const totalGeneral = precioBase * numPizzas;

    this.formGroup.patchValue({
      totalPedido: totalGeneral
    }, { emitEvent: false });
  }

  onSubmit(): void {
    // Si el formulario no está completamente lleno y válido, detenemos el proceso
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca los campos para que se muestren posibles alertas visuales
      alert('⚠️ Por favor completa todos los campos obligatorios antes de guardar el pedido.');
      return;
    }

    const formVal = this.formGroup.getRawValue();

    const seleccionados = [];
    if (formVal.ingredientes.jamon) seleccionados.push('Jamón');
    if (formVal.ingredientes.pina) seleccionados.push('Piña');
    if (formVal.ingredientes.champiñones) seleccionados.push('Champiñones');

    const ingredientesTexto = seleccionados.length > 0 ? seleccionados.join(', ') : 'Ninguno';

    const datosFinales = {
      nombreCompleto: formVal.nombreCompleto,
      direccion: formVal.direccion,
      telefono: formVal.telefono,
      fechaCompra: formVal.fechaCompra,
      totalPedido: formVal.totalPedido,
      ingredientesSeleccionados: ingredientesTexto,
      tamanoSeleccionado: formVal.tamano,
      numPizzas: formVal.numPizzas
    };

    console.log('Enviando pedido validado a Flask:', datosFinales);

    this.pedidosService.agregarNuevoPedido(datosFinales).subscribe({
      next: (respuesta) => {
        alert('¡Pedido registrado correctamente en la base de datos!');
        this.formGroup.reset();
        this.router.navigate(['/negocio/pedidos']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert('Ocurrió un error al guardar el pedido en el servidor');
      }
    });
  }
}