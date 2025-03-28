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

@Component({
  selector: 'app-edit-estado',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-estado.component.html',
  styleUrl: './edit-estado.component.scss',
})
export class EditEstadoComponent implements OnInit, OnDestroy {
  updateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: estadoDTO,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      est_id: [this.data?.est_id || '', [Validators.required]],
      est_name: [this.data?.est_name || '', [Validators.required]],
      est_details: [this.data?.est_details || '', [Validators.required]],
      est_color: [this.data?.est_color || '', [Validators.required]],
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
      let updatedData: estadoDTO = {
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

// est_id: number;
//   est_name: string;
//   est_details: string;
//   est_color: string;
