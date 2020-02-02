'use strict';

import gsap from 'gsap';

class Reveal {
  constructor(el, opt, callback) {
    document.querySelectorAll(el).forEach(elem => {
      this.init(elem, opt, callback);
    });
  }

  init(el, opt, callback) {
    const options = $.extend({
      threshold: 0,
      dur: 0.6,
      delay: 0
    }, opt);

    const elem = el;

    if(elem.getAttribute('data-delay')) {
      options.delay = elem.getAttribute('data-delay');
    }

    gsap.set(elem, { opacity: 0, y: 40 });

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          gsap.to(elem, options.dur, { opacity: 1, y: 0, delay: options.delay });
          if(callback) callback();
        }
      })
    }, {
      threshold: options.threshold
    });

    io.observe(elem);
  }
}

export default Reveal;
