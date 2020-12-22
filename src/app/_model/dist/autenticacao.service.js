"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutenticacaoService = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
var AutenticacaoService = /** @class */ (function () {
    function AutenticacaoService(router) {
        this.router = router;
    }
    AutenticacaoService.prototype.autenticar = function (email, senha) {
        var _this = this;
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(function () {
            firebase.auth().currentUser.getIdToken()
                .then(function (idToken) {
                _this.token_id = idToken,
                    localStorage.setItem('idToken', idToken),
                    _this.router.navigate(['/home']);
            });
        })["catch"](function (error) { return console.log(error); });
    };
    AutenticacaoService.prototype.autenticado = function () {
        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken');
        }
        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }
        return this.token_id !== undefined;
    };
    AutenticacaoService.prototype.logout = function () {
        var _this = this;
        firebase.auth().signOut()
            .then(function () {
            _this.token_id = undefined;
            localStorage.removeItem('idToken');
            _this.router.navigate(['/']);
        });
    };
    AutenticacaoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AutenticacaoService);
    return AutenticacaoService;
}());
exports.AutenticacaoService = AutenticacaoService;
