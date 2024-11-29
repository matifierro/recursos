export class User {

    fechaRegistro: string = new Date().toLocaleDateString('es-ES');
    type: string = 'USER';
    id: number = 0;
    firstName: string ='';
    lastName:string='';
    cursosComprados: number[] = [];
    cursosDictados: number[]= [];
    email: string='';
    password: string='';
}
