import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Asegúrate de usar la ruta correcta a tu servicio AuthService
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  Posts: Post[] = [];

  constructor(private postService: PostService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        from(this.postService.getPosts(user.uid)).subscribe((posts: Post[]) => {
          this.Posts = posts;
        });
      }
    });
  }

  editPost(postId: string) {
    this.router.navigate(['/Editar', postId]);
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).then(() => {
      // manejar éxito...
      this.Posts = this.Posts.filter(post => post.id !== postId);
    }).catch(() => {
      // manejar error...
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    // Crear un array de objetos para la tabla y ordenarlo por 'municipio'
    const tableData = this.Posts.map(post => ({
      nombre: post.nombre,
      calle: post.calle,
      municipio: post.municipio,
      colonia: post.colonia,
      litros: post.litros
    })).sort((a, b) => a.municipio.localeCompare(b.municipio));

    // Agregar la tabla al documento
    autoTable(doc, {
      head: [['Nombre', 'Calle', 'Municipio', 'Colonia', 'Litros']],
      body: tableData.map(row => [row.nombre, row.calle, row.municipio, row.colonia, row.litros]),
      startY: 20
    });

    // Guardar el documento
    doc.save('bitacora.pdf');
  }
  
  printTotalLitros() {
    const doc = new jsPDF();

    // Calcular la suma total de litros por municipio
    const totals: { [key: string]: number } = this.Posts.reduce((acc: { [key: string]: number }, post: Post) => {
      if (!acc[post.municipio]) {
        acc[post.municipio] = 0;
      }
      acc[post.municipio] += Number(post.litros); // Asegúrate de que los litros se traten como números
      return acc;
    }, {});

    // Crear un array de objetos para la tabla
    const tableData = Object.keys(totals).map(municipio => ({
      municipio,
      litros: totals[municipio]
    }));

    // Agregar la tabla al documento
    autoTable(doc, {
      head: [['Municipio', 'Total Litros']],
      body: tableData.map(row => [row.municipio, row.litros]),
      startY: 20
    });

    // Guardar el documento
    doc.save('total_litros.pdf');
  }
}