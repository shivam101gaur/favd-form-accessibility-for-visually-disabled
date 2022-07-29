import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCreatorComponent } from './components/form-creator/form-creator.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { FormsModule } from '@angular/forms';
import { VoiceRecognitionService } from './service/voice-recognition.service';


@NgModule({
  declarations: [
    AppComponent,
    FormCreatorComponent,
    FormGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [VoiceRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
