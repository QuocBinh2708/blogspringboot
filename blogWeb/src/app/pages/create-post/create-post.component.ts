import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      postedby: [null, Validators.required]
    });
  }

  add(event: any) {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createPost(){
    const data = this.postForm.value;
    data.tags = this.tags;

    this.postService.createNewPost(data).subscribe(res=>{
      this.snackBar.open("Post Created Successfully", "Ok");
      this.router.navigateByUrl("/");
    }, error=>{
      this.snackBar.open("Sussy Baka","Ok")
    })
  }
}
