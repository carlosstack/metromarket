import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private authService: AuthService,private userService: UserService, private router: Router) { }

  @ViewChild('imageUser', { static: false }) inputImageUser: ElementRef;

  user: UserInterface = {
    id: '',
    uid:'',
    name: '',
    email: '',
    phone_number: '',
    photoUrl: null,
    rating_count:0,
    rating:0
    
  }

  userInit: Observable<UserInterface>;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  file: string = '';
  filePath: string = '';
  id: string = '';
  photoUrlUserNull='https://firebasestorage.googleapis.com/v0/b/metromarket-e7539.appspot.com/o/uploads%2Fprofile.png?alt=media&token=bc118ab1-7fb2-4bc1-8b8d-af15ec6a945d';

  ngOnInit() {

   

    this.authService.isAuth().subscribe(user => {
    
     

      this.user.email = user.email;

      this.userService.getOneUser(user.displayName).valueChanges().subscribe(data=>{
        this.user.phone_number=data.phone_number;
        this.user.name=data.name;
        this.user.username=data.username;
        
      })


      this.user.photoUrl = user.photoURL;

    })
  }

  onUpload(e) {
    this.id = Math.random().toString(36).substring(2);
    this.file = e.target.files[0];
    this.filePath = `uploads/profile_${this.id}`;
    this.OnSubmitUpload();

  }
  OnSubmitUpload() {
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    
    
  }
  onUploadPhotoURL() {


    this.user.photoUrl = this.inputImageUser.nativeElement.value;

      this.authService.isAuth().subscribe(user => {

        this.userService.getOneUser(user.displayName).valueChanges().subscribe(user=>{
          user.photoUrl=this.inputImageUser.nativeElement.value;
          this.userService.updateUser(user);
        });
    
        user.updateProfile({
          photoURL: this.inputImageUser.nativeElement.value
        }).then(function () {

        }, function (error) {

        });


      })
    }

    onSave(){
      this.authService.isAuth().subscribe(user=>{

        this.user.uid=user.uid;
        this.user.email=user.email;
        this.user.photoUrl=user.photoURL;

        if(this.user.photoUrl==null){
          this.user.photoUrl= this.photoUrlUserNull;
        }

        
    
        this.userService.addUser(this.user);
        this.router.navigate(['/exchange/all-oferts']);
      })
      

    }
  


}
