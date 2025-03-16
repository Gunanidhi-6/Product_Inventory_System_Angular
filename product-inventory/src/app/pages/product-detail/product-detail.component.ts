import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-view',  
  templateUrl: './product-detail.component.html',  
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule, RouterModule]  
})

export class ProductViewComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: any) => {
        this.product = data;
      });
    }
  }
}
