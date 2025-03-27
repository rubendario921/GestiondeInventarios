import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../../Services/productos.service';
import { CustomToastrService } from '../../../Services/custom-toastr.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-producto',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './view-producto.component.html',
  styleUrl: './view-producto.component.scss',
})
export class ViewProductoComponent implements OnInit, OnDestroy {
  //Variables

  idProducto!: number;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'prod_id',
    'prod_name',
    'prod_details',
    // 'cat_id',
    // 'prod_image',
    'prod_price',
    'prod_stock',
    // 'est_id',
    'catName',
    'estName',
    'acciones',
  ];
  private subscriptions!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productoServices: ProductosService,
    private customToastr: CustomToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDataProductos();
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

  getAllDataProductos() {
    this.subscriptions = this.productoServices.getAllProductos().subscribe({
      next: (data) => {
        if (data) {
          this.customToastr.showInfo('Carga de datos exitosa', 'Info');

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
    });
  }

  deleteProducto(id: number) {
    if (!window.confirm('Desea eliminar el producto seleccionado')) {
      return;
    }

    this.subscriptions = this.productoServices.deleteProducto(id).subscribe({
      next: (data) => {
        if (data) {
          this.customToastr.showSuccess(
            'Datos eliminados correctamente',
            'Correcto'
          );
          this.getAllDataProductos();
        } else {
          this.customToastr.showError('Datos no eliminados', 'Error');
        }
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
