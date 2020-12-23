"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'faturaCliente';
    }
    AppComponent.prototype.ngOnInit = function () {
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
