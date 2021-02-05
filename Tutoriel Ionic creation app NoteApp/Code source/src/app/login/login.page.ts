import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  connexion(form) {
    firebase.auth().signInWithEmailAndPassword(form.value.email, form.value.password).then(
        () => {
          this.navCtrl.navigateForward('home');

        },
        (error) => {
          alert(error);
        }
    );
  }

}
