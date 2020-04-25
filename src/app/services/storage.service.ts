import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  getUrlImage(path: string): string {
    this.storage.storage.ref(path).getDownloadURL().then((url) => {
      return url
    })
    return null
  }
}
