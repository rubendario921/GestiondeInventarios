import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productoDTO } from '../ModelDTO/productoDTO';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  //API
  private APIURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProductos(): Observable<any> {
    return this.http.get<any>(this.APIURL + '/Producto/GetAllProductos');
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(this.APIURL + '/' + id);
  }

  saveProducto(producto: productoDTO): Observable<any> {
    return this.http.post<any>(
      this.APIURL + '/Producto/SaveProductos/',
      producto
    );
  }

  updateProducto(producto: productoDTO): Observable<any> {
    return this.http.put<any>(
      this.APIURL + '/Producto/UpdateProductos/' + producto.prod_id,
      producto
    );
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(
      this.APIURL + '/Producto/DeleteProductos/' + id
    );
  }
}
