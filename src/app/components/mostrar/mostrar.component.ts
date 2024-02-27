import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  Posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    from(this.postService.getPosts()).subscribe(posts => {
      this.Posts = posts;
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