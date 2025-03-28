import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CategoriaService } from '../../../Services/categoria.service';
import { CustomToastrService } from '../../../Services/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-categoria',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './new-categoria.component.html',
  styleUrl: './new-categoria.component.scss',
})
export class NewCategoriaComponent implements OnInit, OnDestroy {
  newForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customToastr: CustomToastrService,
    private categoriaServices: CategoriaService
  ) {
    this.newForm = this.fb.group({
      cat_name: ['', Validators.required],
      cat_details: ['', Validators.required],
      cat_group: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.newForm) {
      this.newForm.reset();
    }
  }

  registerNewEstado() {
    if (!this.newForm.valid) {
      console.log('Error: Formulario no valido');
    }

    let newEstado = this.newForm.value;
    let categoriaDTO: any = {
      cat_id: 0,
      cat_name: newEstado.cat_name,
      cat_details: newEstado.cat_details,
      cat_group: newEstado.cat_group,
    };
    this.categoriaServices.saveCategoria(categoriaDTO).subscribe({
      next: (data) => {
        if (data) {
          this.customToastr.showSuccess(
            'Registro guardado correctamente',
            'Correcto'
          );
          this.router.navigate(['/categorias']).then(() => {
            window.location.reload();
          });
        } else {
          this.customToastr.showError('Error en guardar el registro', 'Error');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

// export interface categoriaDTO {
//   cat_id: number;
//   cat_name: string;
//   cat_details: string;
//   cat_group: string;
// }
