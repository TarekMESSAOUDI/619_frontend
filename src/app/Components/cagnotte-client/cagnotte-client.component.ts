import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cagnotte } from 'src/app/Models/Cagnotte';
import { CagnotteService } from 'src/app/Services/Cagnotte/cagnotte.service';

@Component({
  selector: 'app-cagnotte-client',
  templateUrl: './cagnotte-client.component.html',
  styleUrls: ['./cagnotte-client.component.css']
})
export class CagnotteClientComponent implements OnInit {

  ListCagnotte : any;
  show:boolean;
  showOrder:boolean;
  val:string;
  message:any;
  cagnotte: Cagnotte = new Cagnotte();
  submitted = false;
  id: number;

  constructor( private route: ActivatedRoute,private router: Router, private cagnotteService : CagnotteService) { }

  ngOnInit(): void {
    this.cagnotte=new Cagnotte();
  
    
    let resp=this.cagnotteService.getAllCagnotte();
    resp.subscribe((data)=>this.ListCagnotte=data);
  }

  
  AddOrderShow(){
    this.show=true;
    this.showOrder=false;
  }
  
  ViewOrder(){
    this.show=false;
    this.showOrder=true;
  }

  //delete cagnotte
  public deleteCagnotte(idCagnotte:number){
    this.cagnotteService.deleteCagnotte(idCagnotte).subscribe(data =>{
      this.ngOnInit();
    },
    error =>
    console.log(error)
    );
    }

  //add Cagnotte

  newOrder(): void {
    this.submitted = false;
    this.cagnotte = new Cagnotte();
  }

  save() {
    this.cagnotteService
    .addcagnotte(this.cagnotte).subscribe(data => {
      console.log(data)
      this.cagnotte = new Cagnotte();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/client/cagnotte']);
  }


}
