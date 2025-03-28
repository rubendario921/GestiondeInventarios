import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../../../Services/categoria.service';
import { CustomToastrService } from '../../../Services/custom-toastr.service';
import { Router } from '@angular/router';
import { EditCategoriaComponent } from '../edit-categoria/edit-categoria.component';

@Component({
  selector: 'app-view-categoria',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './view-categoria.component.html',
  styleUrl: './view-categoria.component.scss',
})
export class ViewCategoriaComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'cat_id',
    'cat_name',
    'cat_details',
    'cat_group',
    'acciones',
  ];
  private subscriptions: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    private customToastr: CustomToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  //Metodos
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllData() {
    this.subscriptions.add(
      this.categoriaService.getAllCategoria().subscribe({
        next: (data) => {
          if (data) {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.customToastr.showError('Carga de datos exitosa', 'Error');
            console.log('No existen datos');
          }
        },
        error: (error) => {
          this.customToastr.showError(error, 'Error');
          console.error(error);
        },
      })
    );
  }

  openEditModal(consult: any) {
    if (!consult) {
      this.customToastr.showWarning('Contenido no identificado', 'Importante');
      console.error('Error: objeto no identificado');
      return;
    }
    console.log(consult);
    const dialogRef = this.dialog.open(EditCategoriaComponent, {
      data: consult,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoriaService.updateCategoria(result).subscribe(() => {
          this.getAllData();
        });
      }
    });
  }

  deleteData(id: number) {
    if (!window.confirm('Desea eliminar el producto seleccionado')) {
      return;
    }

    this.subscriptions = this.categoriaService.deleteCategoria(id).subscribe({
      next: (data) => {
        if (data) {
          this.customToastr.showSuccess(
            'Datos eliminados correctamente',
            'Correcto'
          );
        } else {
          this.customToastr.showError('Datos no eliminados', 'Error');
        }
        this.router.navigate(['/estados']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.customToastr.showError(error, 'Error');
      },
      complete: () => {
        this.subscriptions.unsubscribe();
      },
    });
  }
}
