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
import { Router } from 'express';
import { EstadosService } from '../../../Services/estados.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
export class NewEstadoComponent {
  //Variables
  newForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customToastr: CustomToastrService
  ) {
    this.newForm = this.fb.group({});
  }
}

// "est_id": 0,
// "est_name": "string",
// "est_details": "string",
// "est_color": "string"
