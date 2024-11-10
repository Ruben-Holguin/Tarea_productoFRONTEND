import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl="http://localhost:8080/api/categorias"
  constructor(private http: HttpClient) { }

  getCategoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  getCategoriaById(id:number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }
  crearCategoria(categoria: Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl,categoria);
  }
  editarCategoria(categoria: Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl,categoria);
  }
  deleteCategoria(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
