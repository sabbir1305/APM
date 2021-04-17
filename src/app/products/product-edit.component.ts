import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName:['',[Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]],
      productCode:['',Validators.required],
      starRating:['',NumberValidators.range(1,5)],
      tags:this.fb.array([]),
      descition:''
    });
  }

}
