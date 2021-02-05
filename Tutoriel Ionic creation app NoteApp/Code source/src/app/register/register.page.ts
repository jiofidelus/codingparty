import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  inscription(form) {
    firebase.auth().createUserWithEmailAndPassword(form.value.email, form.value.password).then(
        () => {
          this.navCtrl.navigateForward('home');

        },
        (error) => {
          alert(error);
        }
    );
  }

}
