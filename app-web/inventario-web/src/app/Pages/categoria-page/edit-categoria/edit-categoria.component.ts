import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { categoriaDTO } from '../../../ModelDTO/categoriaDTO';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-categoria',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.scss',
})
export class EditCategoriaComponent implements OnInit, OnDestroy {
  updateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: categoriaDTO,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      cat_id: [this.data?.cat_id || '', [Validators.required]],
      cat_name: [this.data?.cat_name || '', [Validators.required]],
      cat_details: [this.data?.cat_details || '', [Validators.required]],
      cat_group: [this.data?.cat_group || '', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    if (this.updateForm) {
      this.updateForm.reset();
    }
  }

  updateProcess() {
    if (this.updateForm.valid) {
      let formValue = this.updateForm.value;
      let updatedData: categoriaDTO = {
        ...this.data,
        ...formValue,
      };
      this.dialogRef.close(updatedData);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

// export interface categoriaDTO {
//   cat_id: number;
//   cat_name: string;
//   cat_details: string;
//   cat_group: string;
// }
