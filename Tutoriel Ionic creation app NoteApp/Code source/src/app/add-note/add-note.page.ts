import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  date: Date = new Date();
  note = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  save() {
    firebase.firestore().collection('notes').doc().set({email: firebase.auth().currentUser.email, note: this.note, date: this.date.toDateString()}).then(
        () => {
            this.navCtrl.navigateBack('home');
        }, (error) => {
            alert(error);
        }
    );
  }

}
