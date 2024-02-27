import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    'nombre': new FormControl(null, Validators.required),
    'calle': new FormControl(null, Validators.required),
    'colonia': new FormControl(null, Validators.required),
    'litros': new FormControl(null, Validators.required)
  });

  constructor(private postService: PostService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      from(this.postService.getPostById(postId)).subscribe(post => {
        this.postForm.setValue({
          nombre: post.nombre,
          calle: post.calle,
          colonia: post.colonia,
          litros: post.litros
        });
      });
    }
  }
  getPostById(postId: string): Observable<Post> {
    // Replace null with the actual implementation
    return from(this.postService.getPostById(postId));
  }

  updatePost() {
    if (this.postForm.valid) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        const updatedPost: Post = {
          ...this.postForm.value,
          id: postId
        };
        this.postService.updatePost(updatedPost).then(() => {
          // manejar éxito...
          this.router.navigate(['/Mostrar']);
        }).catch(() => {
          // manejar error...
        });
      }
    }
  }
}