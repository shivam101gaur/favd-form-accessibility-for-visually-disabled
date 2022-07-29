import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { formElement } from '../form-creator/form-creator.component';


@Component({
  selector: 'form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})
export class FormGeneratorComponent implements OnInit {

  // array to store output form array
  opFormArray: formElement[] = []
  formElementKeys: ((keyof formElement))[] = ['id', 'label', 'placeholder', 'speech', 'type', 'value']

  @Output() onFormGenerate = new EventEmitter<formElement[]>();

  constructor() { }

  ngOnInit(): void {
    const ele = new formElement();
    ele.id = 'uname';
    ele.label = 'User Name';
    ele.type = 'text';
    ele.speech = 'How should I call you?';
    ele.placeholder = 'DevSolanki'
    this.opFormArray.push(ele)
  }

  addElement() {
    const ele = new formElement();
    this.opFormArray.push(ele)
  }

  removeElement(i: number) {
    this.opFormArray.splice(i, 1)
  }

  validateId() {
    const idArr: string[] = []
    for (const [i, v] of this.opFormArray.entries()) {
      if (idArr.includes(v.id)) {
        alert('Duplicate ID in form element at position ' + i);
        v.id = ''
      } else {
        idArr.push(v.id)
      }

    }
  }
  generateForm() {
    this.validateId()
    this.onFormGenerate.emit(this.opFormArray);
  }

}
