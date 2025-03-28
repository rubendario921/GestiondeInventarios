import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { estadoDTO } from '../../../ModelDTO/estadoDTO';
import { categoriaDTO } from '../../../ModelDTO/categoriaDTO';
import { productoDTO } from '../../../ModelDTO/productoDTO';
import { EstadosService } from '../../../Services/estados.service';
import { CategoriaService } from '../../../Services/categoria.service';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.scss',
})
export class EditProductoComponent implements OnInit, OnDestroy {
  updateFormProduct!: FormGroup;
  allEstado: estadoDTO[] = [];
  allCategoria: categoriaDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: productoDTO,
    private fb: FormBuilder,
    private estadoService: EstadosService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.loadAllEstados();
    this.loadAllCategorias();

    this.updateFormProduct = this.fb.group({
      prod_name: [this.data?.prod_name || '', [Validators.required]],
      prod_details: [this.data?.prod_details || '', Validators.required],
      prod_price: [this.data?.prod_price || '', Validators.required],
      prod_stock: [this.data?.prod_stock || '', Validators.required],
      estName: [this.data?.estName || '', Validators.required],
      catName: [this.data?.catName || '', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.updateFormProduct) {
      this.updateFormProduct.reset();
    }
  }

  updateProducto() {
    if (this.updateFormProduct.valid) {
      let formValue = this.updateFormProduct.value;
      let updatedData: productoDTO = {
        ...this.data,
        ...formValue,
      };
      this.dialogRef.close(updatedData);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  //Estados
  loadAllEstados(): void {
    this.estadoService.getAllEstados().subscribe({
      next: (data) => {
        if (data) {
          this.allEstado = data;
        } else {
          console.log('No hay estados disponibles');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  //Categorias
  loadAllCategorias(): void {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        if (data) {
          this.allCategoria = data;
        } else {
          console.log('No hay categorias disponibles');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
