import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployDashboardModule } from './employ-dashboard.module';

@Component({
  selector: 'app-employ-dashboard',
  templateUrl: './employ-dashboard.component.html',
  styleUrls: ['./employ-dashboard.component.css']
})
export class EmployDashboardComponent implements OnInit {
  
  formValue !: FormGroup;
  dataObject : EmployDashboardModule = new EmployDashboardModule();
  formData !: any;
  submitted = false;
  filterTerm !: any;
  
  items !: FormArray;
  
  constructor(private formbuilder: FormBuilder, private api: ApiService) { 
    this.formValue = this.formbuilder.group({
      demoArray : this.formbuilder.array([])
   });
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      price : ['', [ Validators.required,
        Validators.pattern("^[0-9]*$")]],
    })  
    this.getDetails();    
  }

  get f() { return this.formValue.controls; }

    postDetails()
    {
      this.submitted = false;
      if (this.formValue.invalid) {
        this.submitted = true;
         return;
       }
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formValue.value, null, 4));
      else
      {
       this.dataObject.name = this.formValue.value.name;
      this.dataObject.description = this.formValue.value.description;
      this.dataObject.price = this.formValue.value.price;

      this.api.postData(this.dataObject)
      .subscribe(res => {
        console.log(res);
        alert("Data added successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getDetails();
        return true; 
      },
      err => {
        alert("'ERROR!! - Data not added");
      })
      }
      }


      getDetails()
      {
       this.api.getData()
       .subscribe(res => {
         this.formData = res;
       })
      }
      
      deleteDetails(row: any)
        {
          this.api.deleteData(row.id)
          .subscribe(res => {
            alert("data deleted");
            this.getDetails();
          })
        }

        editData(row: any)
        {
          this.dataObject.id = row.id;
          this.formValue.controls['name'].setValue(row.name);
          this.formValue.controls['description'].setValue(row.description);
          this.formValue.controls['price'].setValue(row.price);
        }

        updateDetails()
        {
          this.dataObject.name = this.formValue.value.name;
          this.dataObject.description = this.formValue.value.description;
          this.dataObject.price = this.formValue.value.price;

          this.api.updateData(this.dataObject,this.dataObject.id)
          .subscribe(res => {
            alert("Data is upadted succesfully");
            let ref = document.getElementById('cancel')
            ref?.click();
            this.formValue.reset();
            this.getDetails();
          })
        }
    
    }

