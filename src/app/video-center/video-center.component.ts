import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  public hidenewVideo: boolean = true;

  videos: any = [];
  // videos: Video[] = [
  //   {'_id': '1', 'title': 'title1', 'url': 'url1', 'description': 'some desc1'},
  //   {'_id': '2', 'title': 'title2', 'url': 'url2', 'description': 'some desc2'},
  //   {'_id': '3', 'title': 'title3', 'url': 'url3', 'description': 'some desc3'},
  //   {'_id': '4', 'title': 'title4', 'url': 'url4', 'description': 'some desc4'}
  // ];

  selectedVideo: Video;
  constructor(private _videoService: VideoService) { }

  ngOnInit(): void {
    this._videoService.getVideos()
      .subscribe(resVideo => {
        for (const d of (resVideo as any)){
          this.videos.push(d);
        }
      });
  }

  onSelectVideo(video: Video){
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideos(video: Video){
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hidenewVideo = true;
        this.selectedVideo = resNewVideo;
      });
  }

  onUpdateVideoEvent(video: Video){
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  }

  newVideo(){
    this.hidenewVideo = false;
  }

  onDeleteVideoEvent(video: Video){
    this._videoService.deleteVideo(video).subscribe(() => {
      this.videos.splice(this.videos.indexOf(video), 1);
    });
    this.selectedVideo = null;
  }

}
