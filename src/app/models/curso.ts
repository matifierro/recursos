

export class Curso{
    id: number = 0;
    date = new Date().toISOString();
    name: string = '';
    category:string= '';
    description: string = '';
    price: number=0;
    image: string= ''; 
    url: string='';
    online:boolean= true;
}