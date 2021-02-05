import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-apercu-note',
  templateUrl: './apercu-note.page.html',
  styleUrls: ['./apercu-note.page.scss'],
})
export class ApercuNotePage implements OnInit {

  note: any = null;
  index = this.activetedRoute.snapshot.paramMap.get('index');

  constructor(private activetedRoute: ActivatedRoute) { }

  ngOnInit() {
    firebase.firestore().collection('notes').doc(this.activetedRoute.snapshot.paramMap.get('id')).get().then(
        (docRef) => {
          this.note = docRef.data();
        } , (error) => {
          alert(error);
        }
    );
  }

}
