import { Component, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page {

  constructor(private speechRecognition: SpeechRecognition, private changeDetectorRef: ChangeDetectorRef, private textToSpeech: TextToSpeech) { }
  speechData: string = 'Default';
  ngOnInit() {

    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }

      });

  }
  startListening() {
    this.speechRecognition.startListening()
      .subscribe(
        async (matches: Array<string>) => {
          const matchData = matches[0];
          if (matchData.toLowerCase() === 'what is my name') {
            this.speechData = 'Harsh Patel';
          } else if (matchData.toLowerCase() === 'what is my profit') {
            this.speechData = '2.5 $';
          } else {
            this.speechData = 'Default Message'
          }
          await this.textToSpeech.speak(this.speechData);
          this.changeDetectorRef.detectChanges();
        },
        (onerror) => console.log('error:', onerror)
      )
  }
}
