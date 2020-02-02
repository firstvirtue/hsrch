/**
* Object Fit
* @author: Jake Lee, jake@iropke.com
*/
'use strict';

class Objectfit {
  constructor() {
    //
  }

  init() {

    if(window.Browser.isIE || window.Browser.isEdge) {
      let self = this;
      self.bindCheckContentRatio();
      window.onresize = () => {
        self.bindCheckContentRatio();
      };
    }
  }

  bindCheckContentRatio() {
    let self = this;

    $('.video-wrapper').each((idx, el) => {
      const isVideo = true;
      self.checkContentRatio(el, isVideo);
    });
  }

  checkContentRatio(el, isVideo = false) {

    let $visual = $(el),
      $parent = $visual.parent(),
      visualRatio = $visual.width() / $visual.height(),
      containerRatio = $parent.width() / $parent.height();

    if(isVideo) {
      visualRatio = $visual[0].videoWidth / $visual[0].videoHeight;
    }

    $visual.toggleClass('object-vertical-fit', visualRatio > containerRatio);

    $visual.css({
      'top': '50%',
      'left': '50%',
      'transform': 'translate3d(-50%, -50%, 0)'
    });

    if($visual.hasClass('object-vertical-fit')) {
      $visual.css({
        'width': 'auto',
        'height': '100%',
      });
    } else {
      $visual.css({
        'width': '100%',
        'height': 'auto'
      });
    }
  }
}

export default Objectfit;
