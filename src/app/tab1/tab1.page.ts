import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';
import { Platform } from '@ionic/angular';
import { AudioToggle } from 'capacitor-speaker-phone-toggle';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{
  IsSpeaker = false;
  IsplayingSong = false;
  public assetPath='';
  constructor(
    private platform:Platform
  ) {
  }
  ngOnInit() {
    this.platform.ready().then(()=>{
      if(this.platform.is("android")){
        this.assetPath="public/assets/song.mp3";
      }else{
        this.assetPath='public/assets/song.mp3'
      }
      NativeAudio.preload({
        assetId: "fire",
        assetPath: this.assetPath,
        audioChannelNum: 1,
        isUrl: false
    }).then((success)=>{
      console.log(success)
    }).catch(error=>{
      console.log(error)
    });   
    })
  this.toggleAudio();
  }
  stopSong(){
    NativeAudio.stop({
      assetId: 'fire',
    });
    this.IsplayingSong=false;
  }
  playsong(){
    NativeAudio.play({
    assetId: 'fire',
    // time: 6.0 - seek time
    });
    this.IsplayingSong = true;
  }
  async toggleAudio() {
    try {
      this.IsSpeaker = !this.IsSpeaker;
      await AudioToggle.setSpeakerOn({ speakerOn: this.IsSpeaker }); // Turn speaker on
      // Or await AudioToggle.setSpeakerOn({ speakerOn: false }); // Turn speaker off
    } catch (error) {
      console.error("Error toggling speaker:", error);
    }
  }
}
