import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public freshList = ['Owes', 'Dia', 'Yum'];
  public productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    //To access the data in your dialog component, you have to use the MAT_DIALOG_DATA injection token:
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    console.log('edit-data', this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  public addProducts() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.apiService.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForm.reset();
            //When closing, an optional result value can be provided. This result value is forwarded as the result of the afterClosed Observable. "save"
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  public updateProduct() {
    this.apiService
      .putProducts(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Product updated successfully');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Error while updating record');
        },
      });
  }
}
