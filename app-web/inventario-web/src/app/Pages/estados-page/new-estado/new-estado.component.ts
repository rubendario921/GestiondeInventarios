import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CustomToastrService } from '../../../Services/custom-toastr.service';
import { EstadosService } from '../../../Services/estados.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-estado',
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
  templateUrl: './new-estado.component.html',
  styleUrl: './new-estado.component.scss',
})
export class NewEstadoComponent implements OnInit, OnDestroy {
  //Variables
  newForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customToastr: CustomToastrService,
    private estadoServices: EstadosService
  ) {
    this.newForm = this.fb.group({
      est_name: ['', Validators.required],
      est_details: ['', Validators.required],
      est_color: ['', Validators.required],
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
    let estadoDTO: any = {
      est_id: 0,
      est_name: newEstado.est_name,
      est_details: newEstado.est_details,
      est_color: newEstado.est_color,
    };
    this.estadoServices.saveEstado(estadoDTO).subscribe({
      next: (data) => {
        if (data) {
          this.customToastr.showSuccess(
            'Registro guardado correctamente',
            'Correcto'
          );
          this.router.navigate(['/estados']).then(() => {
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
