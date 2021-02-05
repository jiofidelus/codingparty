import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    notes: any[] = [];

  constructor(private navCtrl: NavController) {}

  deconnexion() {
    firebase.auth().signOut().then(
        () => {
          this.navCtrl.navigateBack('login');
        }, (error) => {
          alert(error);
        }
    );
  }

    ngOnInit(): void {
      firebase.firestore().collection('notes').where('email', '==', firebase.auth().currentUser.email).onSnapshot(
          (docRef) => {
              this.notes = [];
              this.notes = docRef.docs as any;
          }, (error) => {
              alert(error);
          }
      );
    }

}
