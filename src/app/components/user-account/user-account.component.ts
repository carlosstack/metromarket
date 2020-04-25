import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  formGroupPersonal: FormGroup;

  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage, private authService: AuthService, private userService: UserService, private router: Router) { }

  private user: UserInterface;
  userInit: Observable<UserInterface>;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  file: string = '';
  filePath: string = '';
  id: string = '';
  public edit: boolean = false;


  currentUserUID: string = ''


  ngOnInit() {

    this.buildFormPersonal()

    this.authService.isAuth().subscribe(user => {
      this.currentUserUID = user.uid

      this.userService.getOneUser(this.currentUserUID).subscribe(user => {
        this.user = user
      })
    })

  }

  buildFormPersonal() {
    this.formGroupPersonal = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }


  onUpload(e) {

    var path = `users-profile/${this.currentUserUID}`
    var file = e.target.files[0];
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    this.uploadPercent = task.percentageChanges();
    ref.getDownloadURL().subscribe((URL) => {
      this.user.photoUrl = URL;
      this.userService.updateUser(this.user)
    });
  }

  onSave() {

    this.userService.addUser(this.user);

  }

  onEdit(){
    if (this.edit) {
      this.edit = false
    }
    else{this.edit = true}
  }



}
