'use strict';

import gsap from 'gsap';

class YoutubeLayer {
  constructor() {
    this.playerId = 'player';
    this.containerId = 'youtube-container';
    this.$container = $('<div id="' + this.containerId + '" class="youtube-container"/>').insertAfter($('.smooth-scroll'));

    this.$layer = $('<div class="youtube-layer" />');
    this.$player = $('<div id="' + this.playerId + '" class="youtube-player" />');
    this.$container.append(this.$layer);
    this.$layer.append(this.$player);
    this.$shadow = $('<div class="shadow"/>').insertBefore(this.$player);

    this.$dimmed = $('<div class="dimmed"/>').insertBefore(this.$layer);
    this.$close = $('<button class="btn--close"/>').insertBefore(this.$layer);

    this.$container.css({
      'display': 'none',
      'opacity': 0,
      'position': 'fixed',
      'left': 0,
      'right': 0,
      'top': 0,
      'bottom': 0
    });

    this.player;

    this.$close.click(e => {
      this.close();

      e.stopPropagation();
      e.preventDefault();
    });

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  open(videoId = '1aenAr1VD_M') {

    gsap.to(this.$layer, 0.5, { opacity: 1, oncomplete: () => {

      this.$container.css({'display': 'flex', 'opacity': 1});

      let ratio = window.innerWidth > 720 ? 0.7 : 0.9;

      let width = window.innerWidth * ratio;
      if(width > 1500) width = 1500;
      let height = width * (360 / 640);

      this.player = new YT.Player(this.playerId, {
        height: height,
        width: width,
        videoId: videoId,
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        },
        playerVars: { 'origin': 'http://localhost:8080' }
      });

      this.$layer.css({
        width: width,
        height: height
      });

      $('#player')
      gsap.to(this.$shadow, 0.5, { opacity: 1, delay: 0.5 });
    }});
  }

  close() {
    this.$container.css({'display': 'none', 'opacity': 0});
    gsap.set(this.$layer, { opacity: 0 });
    gsap.set(this.$shadow, { opacity: 0 });
    this.player.destroy();
  }

  onPlayerReady() {

  }

  onPlayerStateChange() {

  }
}

export default YoutubeLayer;
