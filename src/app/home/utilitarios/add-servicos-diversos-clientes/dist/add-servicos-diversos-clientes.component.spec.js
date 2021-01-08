"use strict";
exports.__esModule = true;
mport;
{
    async, ComponentFixture, TestBed;
}
from;
'@angular/core/testing';
var add_servicos_diversos_clientes_component_1 = require("./add-servicos-diversos-clientes.component");
describe('AddServicosDiversosClientesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [add_servicos_diversos_clientes_component_1.AddServicosDiversosClientesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(add_servicos_diversos_clientes_component_1.AddServicosDiversosClientesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
