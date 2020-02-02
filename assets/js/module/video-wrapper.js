/**
 * Video Wrapper
 * @author: Jake Lee, jake@iropke.com
 */
'use strict';

class VideoObject {
  constructor(el) {
    let self = this,
      id = this.guid(),
      $holder = $(el),
      $attributes = $holder.prop('attributes');

    this.desktopSrc = 'data-d-src';
    this.desktopPosterSrc = 'data-d-poster-src';
    this.mobileSrc = undefined;
    this.mobilePosterSrc = undefined;
    this.defaultSrc = this.desktopSrc;
    this.defaultPosterSrc = this.desktopPosterSrc;
    this.switchSrc = this.mobileSrc;

    this.id = id;
    this.$video = $('<video/>');

    $holder.replaceWith(this.$video);

    $.each($attributes, function() {
      self.$video.attr(this.name, this.value);
    });

    this.$video.attr('id', this.id);

    this.$video.attr('src', this.$video.attr(this.defaultSrc));
    this.$video.attr('poster', this.$video.attr(this.defaultPosterSrc));

    this.$video.attr('autoplay', 'autoplay');
    this.$video.attr('playsinline', '');

    this.video = this.$video[0];
    this.video.loop = !this.$video.attr('data-loop') ? true : false;
    this.video.muted = true;

    this.setVideoState();

    // [NOTE] 비디오 로드를 위한 프로미스
    // 모든 비디오 엘리먼트가 로드되어야 비로소 objectfit의 커스텀 모듈이 동작할 수 있기에
    // 로드된 상태를 알기 위해 사용함. (objectfit의 커스텀 모듈은 IE만 사용)
    this.promise = new Promise((resolve, reject) => {
      this.$video[0].addEventListener('loadeddata', () => {
        resolve(this);
      });

      this.$video[0].addEventListener('error', () => {
        reject();
      });
    });

    return this;
  }

  // [NOTE] The play() request was interrupted by a call to pause() 에러 해결책
  // setVideoState, playVideo, pauseVideo 3개 메서드를 사용하여 플래그와 이벤트를 이용해 상태를 판별한다.
  setVideoState() {
    // [NOTE] 비디오 상태 플래그
    this.onplaying = true;
    this.onpause = false;

    // 비디오 상태 함수
    this.video.onplaying = () => {
      this.onplaying = true;
      this.onpause = false;
    };

    this.video.onpause = () => {
      this.onplaying = false;
      this.onpause = true;
    };
  }

  playVideo() {
    // if (this.video.paused && !this.onplaying) {
      this.video.play();
    // }
  }

  pauseVideo() {
    if (!this.video.paused && !this.onpause) {
      this.video.pause();
    }
  }

  switchResource(isMobile) {
    if (this.video.getAttribute(this.switchSrc)) {
      let src, poster;

      this.pauseVideo();

      if (isMobile) {
        src = this.video.getAttribute('data-m-src');
        poster = this.video.getAttribute('data-m-poster-src');
      } else {
        src = this.video.getAttribute('data-d-src');
        poster = this.video.getAttribute('data-d-poster-src');
      }

      this.video.setAttribute('src', src);
      this.video.setAttribute('poster', poster);

      this.playVideo();
    }
  }

  guid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}

class VideoWrapper {
  constructor() {
    this.videoClass = 'video.video-wrapper';
    this.videoHolderClass = 'div.video-wrapper';
  }

  init(param) {
    this.initVideo(param);
    this.setSwitchVideo();
    this.setVideoScroll();
  }

  initVideo(param) {
    this.videoObjectList = [];
    this.videoPromiseList = [];

    $(this.videoHolderClass).each((idx, el) => {
      let videoObject = new VideoObject(el);
      this.videoObjectList.push(videoObject);
      this.videoPromiseList.push(videoObject.promise);
    });

    Promise.all(this.videoPromiseList)
      .then(() => {
        if (param && param.oncomplete) param.oncomplete();
      })
      .catch((err) => {
        console.log(`비디오 로드 에러: ${err}`);
      });
  }

  setSwitchVideo() {
    let self = this;

    // Util.switchedResize(this.videoClass, function() {
    //   return window.innerWidth <= 720;
    // }, function(isMobile) {
    //   self.updateResource(isMobile);
    // });
  }

  updateResource(isMobile) {
    $.each(this.videoObjectList, (idx, el) => {
      el.switchResource(isMobile);
    });
  }

  setVideoScroll() {

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {

        if(entry.intersectionRect.height === 0) return;

        const video = entry.target;

        if(entry.isIntersecting) {
          let id = video.getAttribute('id');
          let videoObject = this.videoObjectList.find(el => {
            return el.id === id;
          });

          if (videoObject !== undefined) {
            if (this.getMobileOperatingSystem() === 'Android') {
              // [NOTE] android-naver 비디오 재생 hack
              window.addEventListener('touchstart', function videoStart() {
                videoObject.playVideo();
                this.removeEventListener('touchstart', videoStart);
              });

            } else {
              videoObject.playVideo();
            }
          }
        } else {
          let id = video.getAttribute('id');
          let videoObject = this.videoObjectList.find(el => {
            return el.id === id;
          });
          if (videoObject !== undefined) {
            videoObject.pauseVideo();
          }
        }
      })
    });

    const videos = document.querySelectorAll(this.videoClass);
    videos.forEach(elem => {
      io.observe(elem);
    });

    // InView(this.videoClass)
    //   .on('enter', video => {
    //     let id = video.getAttribute('id');
    //     let videoObject = this.videoObjectList.find(el => {
    //       return el.id === id;
    //     });
    //
    //     if (videoObject !== undefined) {
    //       if (this.getMobileOperatingSystem() === 'Android' && $('html').hasClass('naver')) {
    //         // [NOTE] android-naver 비디오 재생 hack
    //         window.addEventListener('touchstart', function videoStart() {
    //           videoObject.playVideo();
    //           this.removeEventListener('touchstart', videoStart);
    //         });
    //
    //       } else {
    //         videoObject.playVideo();
    //       }
    //     }
    //   })
    //   .on('exit', video => {
    //     let id = video.getAttribute('id');
    //     let videoObject = this.videoObjectList.find(el => {
    //       return el.id === id;
    //     });
    //     if (videoObject !== undefined) {
    //       videoObject.pauseVideo();
    //     }
    //
    //   });
  }

  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }

    return 'unknown';
  }
}

export default VideoWrapper;
