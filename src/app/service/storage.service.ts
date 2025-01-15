import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  getImageUrl(imageId: string): Observable<string> {
    const ref = this.storage.ref(`imagenes/${imageId}`);
    return ref.getDownloadURL();
  }
}
