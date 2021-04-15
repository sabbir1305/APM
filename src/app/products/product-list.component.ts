import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
  selector:'pm-products',
  templateUrl:'./product-list.component.html',
  styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements  OnInit,OnDestroy{


  imageWidth:number=50;
  imageMargin:number=2;
  pageTitle:string = "Product List";
  showImage = false;
  error:string='';
  private _listFilter :string='';
  sub!:Subscription;
constructor (private productService:ProductService){}



  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    this.filteredProduct = this.performFilter(value);
  }
  filteredProduct:IProduct[]=[];
  products:IProduct[]=[];

  toggleImage():void{
    this.showImage=!this.showImage;
  }
  ngOnInit(): void {
    this.sub= this.productService.getProducts().subscribe({
       next : products =>{
        this.products=products;
        this.filteredProduct = this.products;
       } ,
       error: err=>this.error=err
     })


  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product:IProduct)=>
    product.productName.toLowerCase().includes(filterBy));
  }
  onRatingClicked(message:string):void{
    this.pageTitle ='Product List: '+message;
  }

}
