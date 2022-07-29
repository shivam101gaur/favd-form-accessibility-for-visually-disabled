import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/service/voice-recognition.service';

@Component({
  selector: 'favd-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCreatorComponent implements OnInit {

  @Input()
  formArray!: formElement[];

  speech = new SpeechSynthesisUtterance();
  synth = window.speechSynthesis;

  SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  constructor(public voiceRecognition: VoiceRecognitionService, public cdrf: ChangeDetectorRef) {
    this.voiceRecognition.init();
  }


  ngOnInit(): void {
    this.voiceRecognition._listeningObs.subscribe(res => { this.cdrf.detectChanges() })
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.cancelAssistant()
  }

  killAssis: boolean = false
  cancelAssistant() {
    this.voiceRecognition.abort();
    this.synth.cancel();
    this.killAssis = true;
    // this.speech.removeEventListener('end')

  }

  tryCount = 0
  // function where voice assistant starts filling the form from first form elements
  fillForm(ele: formElement) {
    this.killAssis = false;
    this.voiceRecognition.text = ''
    this.voiceRecognition.stop();
    this.synth.cancel()

    this.speech.text = ele.speech
    this.synth.speak(this.speech)

    this.speech.onend = (e) => {
      if (this.killAssis) { return }
      this.voiceRecognition.start().then(res => {
        if (res) { ele.value = res as any; this.cdrf.detectChanges(); this.shiftFocus(ele?.id);this.tryCount=0; }
        console.log(res)

      }).catch(err => {
        console.log(err)
        if(this.tryCount>3){ this.cancelAssistant();return;}
        this.tryCount++;
        this.speech.text = 'Sorry, did not catch that. Try again!'
        this.synth.speak(this.speech)
      });
    }
  }

  // shift focus to next element in form
  shiftFocus(currentId: string) {
    const currentIndex = this.formArray.findIndex(ele => {
      return ele.id == currentId
    })
    if (currentIndex < this.formArray.length) {
      const nextId = this.formArray[currentIndex + 1]?.id;
      document.getElementById(nextId)?.focus()
    }
  }

  save(){
    this.cancelAssistant();
    this.speech.text='Your data is saved. Thank you for trusting us. laul!';
    this.synth.speak(this.speech)
  }

}

export interface formElement {
  label: string;
  type: 'text';
  speech: string;
  id: string;
  value?: string | number;
  placeholder?: string;
}
export class formElement implements formElement {
  constructor() { this.label = 'N/A' }
}
