import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<firebase.User | null>(null);

  get $user(): Observable<firebase.User | null> {
    return this._user.asObservable();
  }

  constructor (private _auth: AngularFireAuth) { 
    this._auth.authState.subscribe(user => this._user.next(user));
  }
  
  signupWithEmail(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this._auth.createUserWithEmailAndPassword(email, password));
  }

  signinWithEmail(email: string, password: string) {
    return from(this._auth.signInWithEmailAndPassword(email, password));
  }

  signInWithGoogle(): Observable<firebase.auth.UserCredential> {
    return from(this._auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  signInWithGithub(): Observable<firebase.auth.UserCredential> {
    return from(this._auth.signInWithPopup(new firebase.auth.GithubAuthProvider()));
  }

  signInWithFacebook(): Observable<firebase.auth.UserCredential> {
    return from(this._auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(this._auth.signOut());
  }
}
