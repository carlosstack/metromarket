import { Component, OnInit } from '@angular/core';
import { PostInterface } from "../../models/post";
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})


export class SocialComponent implements OnInit {

  constructor(private auth: AuthService, private service: PostService) { }

  private posts;
  private result;


  post: PostInterface = {
    text: '',
    id: '',
    date: null,
    owner_id: '',
    owner_name: '',
    owner_photo_url: ''
  }

  private user;

  ngOnInit() {
    this.auth.isAuth().subscribe(user => {

      this.service.getAll().subscribe(posts => {

        this.posts = posts;
        this.user=user;

      })

      
    
    })

  }

add() {

    this.result = this.service.add(this.post);

    if (this.result) {
      console.log('succesfull')
    } else {
      this.post.text = '';
    }
    //en esta parte si el método devuelve un resultado, sabemos que fue añadida.
  
  }
}
