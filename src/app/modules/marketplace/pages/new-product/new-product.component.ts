import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from "../../../../shared/services/product.service";
import { ProductInterface } from "../../../../shared/models/product";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { removeSpaces } from '../../../../shared/validators/remove-spaces.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  editProduct: ProductInterface;

  constructor(private authService: AuthService, private storage: AngularFireStorage, private service: ProductService, private formBuilder: FormBuilder, private router: Router) { }
  
  formGroupProductTitle: FormGroup;
  formGroupProductGalery: FormGroup;
  formGroupProductPrice: FormGroup;

  product: ProductInterface = {
    title: '',
    description: '',
    price: null,
    category: 'Sin categoria',
    date: null,
    id: null,
    owner_id: null,

  };

  uploadTasks = [];
  galeryFiles = [];
  private reader;
  public progress;
  public loadingNow;
  isHovering: boolean;
  sizeError: string;

  public editProductGaleryCount: number;
  public editProductGalery: string[];

  ngOnInit() {
    this.product.galery = []
    if (this.editProduct) {
      console.log('en edit')
      this.editProductGaleryCount = this.editProduct.galery.length
      this.editProductGalery=[]
      this.editProduct.galery.forEach(img => {
        this.editProductGalery.push(img);
      });
      //this.buildFormEditProduct()
    } else {

      this.buildFormProductTitle()
      this.buildFormProductGalery()
      this.buildFormProductPrice()
    }


  }

  toggleHover(event: boolean) {
    this.isHovering = event;

  }

  onDrop(files: FileList) {
    this.sizeError = '';
    for (let i = 0; i < files.length; i++) {
      if (files[i].size < 10000000) {


        if (this.galeryFiles.length < 7 && !document.getElementById(files.item(i).name)) {

          this.galeryFiles.push(files.item(i))

          this.reader = new FileReader();
          this.reader.onload = function (e) {
            var filePreview = document.createElement('img');
            filePreview.className = 'img img-fluid'
            filePreview.src = URL.createObjectURL(files.item(i));
            var previewZone = document.getElementById(files.item(i).name)
            previewZone.appendChild(filePreview)
          }
          this.reader.readAsDataURL(files.item(i))
        }
      } else {
        this.sizeError = 'Archivo ' + files[i].name + ' demasiado grande. Tamaño máximo permitido 10mb.'
      }
    }
  }

  buildFormProductTitle() {
    this.formGroupProductTitle = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(10), removeSpaces]],
      quality:['',[Validators.required]]

    });
  }
  buildFormProductGalery() {
    this.formGroupProductGalery = this.formBuilder.group({
      galery: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), removeSpaces]],


    });
  }


  buildFormProductPrice() {
    this.formGroupProductPrice = this.formBuilder.group({
      amountCurrency: ['$', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
      category: ['', [Validators.required]],

    });
  }

  saveImgFile(event) {
    this.sizeError = '';
    if (event.target.files && event.target.files[0]) {
      for (let index = 0; index < event.target.files.length; index++) {
        if (event.target.files[index].size < 10000000) {
          if (this.galeryFiles.length < 7 && !document.getElementById(event.target.files[index].name)) {

            this.galeryFiles.push(event.target.files[index])

            this.reader = new FileReader();
            this.reader.onload = function (e) {
              var filePreview = document.createElement('img');
              filePreview.className = 'img'
              filePreview.style.width = '90px';
              filePreview.style.height = '90px';
              filePreview.src = URL.createObjectURL(event.target.files[index]);
              var previewZone = document.getElementById(event.target.files[index].name)
              previewZone.appendChild(filePreview)
            }
            this.reader.readAsDataURL(event.target.files[index])
          }
        } else {
          this.sizeError = 'Archivo ' + event.target.files[index].name + ' demasiado grande. Tamaño máximo permitido 10mb.'
        }

      }
    }
  }

  deleteImg(fileCanceled) {
    if (this.galeryFiles.length == 1) {
      this.galeryFiles = []
      this.product.galery = []
    } else {
      for (let index = 0; index < this.galeryFiles.length; index++) {
        const file = this.galeryFiles[index];
        if (file == fileCanceled) {
          this.galeryFiles.splice(index, 1);
          this.product.galery.splice(index, 1);
        }
      }

    }
  }
  deleteImgEdit(i) {
    this.editProduct.galery.splice(i, 1);
    this.editProductGalery.splice(i,1);
    this.editProductGaleryCount--;
  }

  onImgLoadFinished(url: string) {
    if (this.editProduct) {
      this.editProduct.galery.push(url)
    }
    this.product.galery.push(url);
  }

  galeryLoadFinished() {

    if (this.editProduct) {
      if ((this.editProductGaleryCount + this.galeryFiles.length) == this.editProduct.galery.length) {
        return true;
      } else {
        return false;
      }
    }

    if (this.galeryFiles.length == this.product.galery.length) {
      return true
    } else {
      return false
    }

  }

  toSentenceFormat(string) {
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');

  }

  saveEdited() {
    //errores
    this.editProduct.title = this.formGroupProductTitle.get('title').value
    this.editProduct.description = this.formGroupProductGalery.get('description').value
    this.editProduct.category = this.formGroupProductPrice.get('category').value
    this.editProduct.price = this.formGroupProductPrice.get('price').value
    this.editProduct.currency = this.formGroupProductPrice.get('amountCurrency').value
    this.editProduct.quality = this.formGroupProductTitle.get('quality').value
    this.service.update(this.editProduct).then(() => {
      this.router.navigateByUrl(`/app/marketplace/m/(marketplace:product/${this.editProduct.id})`);
    });
  }

  add() {
    this.product.title = this.formGroupProductTitle.get('title').value
    this.product.description = this.formGroupProductGalery.get('description').value
    this.product.category = this.formGroupProductPrice.get('category').value
    this.product.price = this.formGroupProductPrice.get('price').value
    this.product.status = 'Activo'
    this.product.quality = this.formGroupProductTitle.get('quality').value
    this.product.currency = this.formGroupProductPrice.get('amountCurrency').value

    this.service.add(this.product)
  }





}