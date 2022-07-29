import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';


/* we declare “webkitSpeechRecognition ” as per the below line. 
Otherwise Angular will not recognize it 
because “webkitSpeechRecognition” is not a library.*/
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})

/**
 * Refernce :https://codeburst.io/creating-a-speech-recognition-app-in-angular-8d1fd8d977ca
 */
export class VoiceRecognitionService {

  /*
  we create and a new instance of webkitSpeechRecognition 
  and initialize it by passing values to properties of webkitSpeechRecognition
  */
  recognition = new webkitSpeechRecognition();
  /**
   * “isStoppedSpeechRecog” variable is the conditional variable 
   * that decides whether the service should be stopped or continued from listening continously.  
   */
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: any;

  constructor() { }

  listening = false;
  private _listeningSubject = new BehaviorSubject<boolean>(false);
  public _listeningObs = this._listeningSubject.asObservable()

 
  
  init() {

    // enable return interim results and set language as our need
    // Interim results are results of recognition that are not yet final
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-IN';

    /*
    Then we call “event listener” for getting identified words 
    and assign those words to the “tempWords” variable to access later.
    */
    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result) => (result as any)[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      this._listeningSubject.next(true);
      console.log(transcript);
    });
  }

  /**
   * Start speech recognition
   */
  start() {

    return new Promise((resolve, reject) => {
      this.isStoppedSpeechRecog = false;

      this.recognition.start();
      this.listening = true;
      this._listeningSubject.next(this.listening)
      console.log({listening:this.listening})
      console.log("Speech recognition started")
      this.recognition.addEventListener('end', (condition: any) => {
        this.listening = false;
      this._listeningSubject.next(this.listening)
      console.log({listening:this.listening})
        console.log('Speech Recognition ended..onend event trigered!');
        if (this.isStoppedSpeechRecog) {
          this.recognition.stop();
          console.log("End speech recognition")
        } else {
          this.wordConcat()
        }
        if(this.text){resolve(this.text)}else{ reject(true) }
      })
     
     
    });

  }

  /**
   * Stop Speech Recognition
   */
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
  }

  abort(){
    this.recognition.abort()
  }
  /**
   * method called “wordConcat()” which contacts all recognized speeches into one paragraph:
   */
  wordConcat() {
    if (!this.tempWords) return
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }
}

