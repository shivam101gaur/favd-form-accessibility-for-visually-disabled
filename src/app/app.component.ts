import { Component } from '@angular/core';
import  { formElement } from './components/form-creator/form-creator.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'favd';

  showGenerator= false;
  formArray:formElement[]=[
    {
      id:'uname',
      label:'Name : ',
      speech:'What should I call you ?',
      type:'text',
      
    },
    {
      id:'gender',
      label:'Gender : ',
      speech:'are you a male or female ?',
      type:'text'
    },
    {
      id:'woc',
      label:'Weapon of Choice : ',
      speech:'What is your weapon of choice : ',
      type:'text'
    },
    {
      id:'age',
      label:'Age :',
      speech:'How long have you been on this planet ?',
      type:'text'
    }

  ]

  generateForm(newFormArray:formElement[]){
   this.formArray = newFormArray
  }
}

