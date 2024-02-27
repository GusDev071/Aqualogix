import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    'nombre': new FormControl(null, Validators.required),
    'calle': new FormControl(null, Validators.required),
    'colonia': new FormControl(null, Validators.required),
    'litros': new FormControl(null, Validators.required)
  });

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'nombre': new FormControl(null, Validators.required),
      'calle': new FormControl(null, Validators.required),
      'colonia': new FormControl(null, Validators.required),
      'litros': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const newPost: Post = this.postForm.value;
      this.postService.createPost(newPost).then(() => {
        // manejar éxito...
        this.postForm.reset();
      }).catch(() => {
        // manejar error...
      });
    }
  }
}