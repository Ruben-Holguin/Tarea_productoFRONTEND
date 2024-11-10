import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [SidebarComponent,TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: Categoria[]=[];
  categoria: Categoria= new Categoria(0, '');
  titulo: string= '';
  opc: string= '';
  op= 0;
  visible: boolean= false;
  isDeleteInProgress: boolean= false;
  
  constructor(private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){}

  ngOnInit():void {
    this.listarCategorias();
}

showDialogCreate(){
  this.titulo= "Añadir nueva Categoria"
  this.opc= "Guardar";
  this.op= 0;
  this.visible= true;
}

limpiar(){
  this.titulo= '';
  this.opc= '';
  this.op= 0;
  this.categoria.id= 0;
  this.categoria.nombre= '';
}

opcion(): void{
  if (this.op==0) {
    this.addCategoria();
    this.limpiar();
  } else if (this.op==1) {
    console.log("Editar");
    this.editCategorias();
    this.limpiar();
  } else {
    console.log("Vacio");
    this.limpiar();
  }
}    

listarCategorias(){
  this.categoriaService.getCategoria().subscribe(
    (data: Categoria[]) => {
      this.categorias = data;
    });
}

addCategoria():void{
  this.categoriaService.crearCategoria(this.categoria).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Correcto',
        detail: 'Categoria registrada con exito',
      });
      this.listarCategorias();
      this.op= 0;
    },
    error: () => {
      this.isDeleteInProgress= false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "No se puedo registrar la categoria",
      });
    },
  });
  this.visible= false;
}

editCategorias() {
  this.categoria.id = Number(this.categorias.find(f => f.id === this.categoria.id)?.id || 0);
  this.categoriaService.editarCategoria(this.categoria).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Correcto',
        detail: 'Categoria editada con exito',
      });
      this.visible = false;
      this.listarCategorias();
      this.op = 0;
    },
    error: () => {
      this.isDeleteInProgress = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo editar la categoria',
      });
    },
  });
}


deleteCategoria(id: number){
  this.isDeleteInProgress= true;
  this.categoriaService.deleteCategoria(id).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Correcto',
        detail: 'Categoria eliminada con exito',
      });
      this.isDeleteInProgress= false;
      this.listarCategorias();
    },
    error: () => {
      this.isDeleteInProgress= false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar la categoria',
      });
    },
  });  
}


showDialogEdit(id: number){
  this.titulo= "Editar Categoria"
  this.opc= "Actualizar";
  this.categoriaService.getCategoriaById(id).subscribe((data)=>{
    this.categoria= data;
    this.op= 1;
  });
  this.visible= true;
}

showDiaologDelete(event: Event, id: number){
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: '¿Quieres eliminar esta categoria?',
    header: 'Confirmacion de Eliminacion',
    icon: 'pi pi-info-circle',
    acceptButtonStyleClass:"p-button-danger p-button-text",
    rejectButtonStyleClass:"p-button-text p-button-text",
    acceptIcon:"none",
    rejectIcon:"none",

    accept: () => {
        this.deleteCategoria(id);
    },
    reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Operacion cancelada' });
    }
  });
}

}
