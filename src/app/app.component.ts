import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'faturaCliente'; 
  
  
  ngOnInit(): void {
    
    var firebaseConfig = {
      apiKey: "AIzaSyA6ORHgUVL1jBtygpoJAf9A4gEyTsgXnXo",
      authDomain: "fatura-cliente-portfolio.firebaseapp.com",
      databaseURL: "https://fatura-cliente-portfolio-default-rtdb.firebaseio.com",
      projectId: "fatura-cliente-portfolio",
      storageBucket: "fatura-cliente-portfolio.appspot.com",
      messagingSenderId: "885236908456",
      appId: "1:885236908456:web:2f02b3737e784e0017dd9d",
      measurementId: "G-TQTQKDW4MY"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}


