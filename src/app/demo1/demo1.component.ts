import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import SiriWave from 'siriwave';
// import * as SiriWave from 'siriwave';
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit,AfterViewInit {
  @Input() musicName;
  constructor() { }
  public isSave:boolean = false;
  ngOnInit() {
    console.log(SiriWave)
    var SW = new SiriWave({
      　　　　　　　　 style: 'ios9',
           　　　　　　 speed: 0.1,
            　　　　　　amplitude: 1,
            　　　　　　speedInterpolationSpeed: 0,
            　　　　　　frequency: 2,
           　　　　　　 height: 424,
           　　　　　　width: 964,
            　　　　　　container: document.getElementById('container1  `'),
            　　　　　　autostart: true
        });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(document.getElementById(this.musicName));
    var wavesurfer = WaveSurfer.create({
        container: '#'+this.musicName,
        waveColor: 'violet',
        progressColor: 'purple'
    });
    wavesurfer.load('../../assets/时秋Yc - 倾城一笑.mp3');
    wavesurfer.play()
  }
}
