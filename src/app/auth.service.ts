import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: Observable<any>;

  constructor() {
    const auth = getAuth();
    const db = getFirestore();
    this.user$ = new Observable(subscriber => {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          if (userData) {
            // Agrega el uid al objeto user
            subscriber.next({ uid: user.uid, ...userData });
          } else {
            subscriber.next(null);
          }
        } else {
          subscriber.next(null);
        }
      });
    });
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  async register(nombre: string, email: string, password: string) {
    const auth = getAuth();
    const db = getFirestore();

    const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', newUserCredential.user.uid), { nombre, email });
  }
}