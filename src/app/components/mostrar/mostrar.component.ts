import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Asegúrate de usar la ruta correcta a tu servicio AuthService


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
        from(this.postService.getPosts(user.uid)).subscribe(posts => {
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
}