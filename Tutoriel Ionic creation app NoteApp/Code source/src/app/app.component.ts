import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      const firebaseConfig = {
        apiKey: 'AIzaSyB-Epxr1bqa0wPQmEPxa_tDe2ONaq901HE',
        authDomain: 'noteapp-90fb8.firebaseapp.com',
        projectId: 'noteapp-90fb8',
        storageBucket: 'noteapp-90fb8.appspot.com',
        messagingSenderId: '334499608663',
        appId: '1:334499608663:web:a3fbb7d5e24729c4204b12'
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
