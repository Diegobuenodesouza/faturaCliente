import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfcnpjPipe'
})
export class CpfcnpjPipePipe implements PipeTransform {

  transform(texto: string, ...args: unknown[]): unknown {
    if (texto.length === 11) {
      return texto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    if (texto.length === 14) {
      return texto.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
    }
    return 'error';
  }

}
