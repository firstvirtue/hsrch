/**
 * Smooth Scroll
 * Dependency: jQuery, rxjs, _cursor-indicator.scss
 * @author: Jake Lee, jake@iropke.com
 */
'use strict';

import gsap from 'gsap';

import { fromEvent, interval, animationFrameScheduler } from 'rxjs';
import { map, withLatestFrom, scan, distinctUntilChanged } from 'rxjs/operators';

class SmoothScroll {
  constructor($el, param) {
    this.setSmoothCursor($el);

    function lerp(start, end) {
      const dy = end - start;
      const rate = 0.05;
      // const rate = 0.04;

      return start + dy * rate;
    }

    const pageScroll$ = fromEvent(window, 'scroll').pipe(
      map(() => {
        return (window.scrollY || window.pageYOffset);
      })
    );

    const animationFrameScheduler$ = interval(0, animationFrameScheduler);
    const smoothMove$ = animationFrameScheduler$.pipe(
      withLatestFrom(pageScroll$, (tick, move) => move),
      scan(lerp)
    );

    const getHeight = () => {
      return (param && param === '100vh' ?
      $el.height() :
      $el.height() - window.innerHeight);
    }
    this.smoothMove = smoothMove$.subscribe(scrollTop => {
      let rate = scrollTop / getHeight() * 200;
      this.$progressIndicator.css('stroke-dashoffset', 200 - rate);
    });
  }

  setSmoothCursor($el) {
    this.$cursor = $('<div id="' + 'cursor-indicator' +'"/>');
    // this.$pillar.append(this.$cursor);
    this.$cursor.insertAfter($el);

    this.$scrollIndicator = $('<div id="scroll-indicator" />');
    this.$progress = $('<div id="cursor-progress"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 72 72" style="enable-background:new 0 0 72 72;" xml:space="preserve"> <circle cx="36" cy="36.72" r="30.14" style="stroke-dashoffset: 200px;"></circle></svg></div>');
    this.$outline = $('<div id="cursor-outline"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 72 72" style="enable-background:new 0 0 72 72;" xml:space="preserve"> <circle cx="36" cy="36.72" r="30.14"></circle></svg></div>');

    this.$scrollIndicator.append(this.$progress);
    this.$scrollIndicator.append(this.$outline);
    this.$cursor.append(this.$scrollIndicator);
    this.$progressIndicator = this.$progress.find('circle');

    this.$cursor.css({
      'position': 'fixed',
      'width': '48px',
      'height': '48px',
      'top': 0,
      'z-index': 100
    });

    const docEl = document.documentElement;

    const mousemove$ = fromEvent(docEl, 'mousemove').pipe(
      map(event => {
        return {
          x: event.clientX,
          y: event.clientY
        }
      })
    );

    const animationFrameScheduler$ = interval(0, animationFrameScheduler);
    const cursormove$ = animationFrameScheduler$.pipe(
      withLatestFrom(mousemove$, (tick, move) => move),
      scan((start, end) => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;

        return {
          x: start.x + dx * 0.04,
          y: start.y + dy * 0.04,
        }
      })
    );

    this.mousemove = cursormove$.subscribe((move) => {
      // this.$cursor.css({'transform': `translate3d(${move.x - 24}px, ${move.y - 24}px, 0)`});
      gsap.to(this.$cursor, 0.1, { x: move.x - 24, y: move.y - 24 });
    });

    $('a').mouseenter(e => {
      gsap.to('#cursor-indicator', 0.5, { autoAlpha: 0, display: 'none' });
    });

    $('a').mouseleave(e => {
      gsap.to('#cursor-indicator', 0.5, { delay: 0.2, autoAlpha: 1, display: 'block' });
    });

  }
}

export default SmoothScroll;
