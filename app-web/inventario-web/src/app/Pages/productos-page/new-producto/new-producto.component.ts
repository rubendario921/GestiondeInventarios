import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomToastrService } from '../../../Services/custom-toastr.service';
import { ProductosService } from '../../../Services/productos.service';
import { estadoDTO } from '../../../ModelDTO/estadoDTO';
import { categoriaDTO } from '../../../ModelDTO/categoriaDTO';
import { EstadosService } from '../../../Services/estados.service';
import { CategoriaService } from '../../../Services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-producto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-producto.component.html',
  styleUrl: './new-producto.component.scss',
})
export class NewProductoComponent implements OnInit, OnDestroy {
  //Variables
  newFormProduct!: FormGroup;
  allCategoria: categoriaDTO[] = [];
  allEstado: estadoDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private customToastr: CustomToastrService,
    private productosServices: ProductosService,
    private estadoService: EstadosService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    //Valdiaciones de formulario
    this.newFormProduct = this.fb.group({
      newName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      newDetails: ['', Validators.required],
      newPrecio: ['', Validators.required],
      newStock: ['', Validators.required],
      newStatus: ['', Validators.required],
      newCategoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAllCategorias();
    this.loadAllEstados();
  }

  ngOnDestroy(): void {
    if (this.newFormProduct) {
      this.newFormProduct.reset();
    }
  }

  //Metodos
  registerNewProduct(): void {
    if (this.newFormProduct.valid) {
      let newProduct = this.newFormProduct.value;
      let productoDTO: any = {
        prod_id: 0,
        prod_name: newProduct.newName,
        prod_details: newProduct.newDetails,
        prod_image: '',
        prod_price: newProduct.newPrecio,
        prod_stock: newProduct.newStock,
        cat_id: newProduct.newCategoria,
        est_id: newProduct.newStatus,
      };

      this.productosServices.saveProducto(productoDTO).subscribe({
        next: (data) => {
          if (data) {
            this.customToastr.showSuccess(
              'Registro guardado correctamente',
              'Correcto'
            );
            this.router.navigate(['/productos']).then(() => {
              window.location.reload();
            });
          } else {
            this.customToastr.showError(
              'Erorr en guardar el registro',
              'Error'
            );
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
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
