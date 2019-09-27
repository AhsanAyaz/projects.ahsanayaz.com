import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[aaPortal]'
})
export class PortalDirective {
  @Input() portalSrc: string;
  @Input() contentSelector = '';
  lightboxId = Math.ceil(new Date().getTime() + ((Math.random() * 10) + 1));
  embedId = Math.ceil(new Date().getTime() + ((Math.random() * 10) + 1));
  initialWidth: number;
  lightbox;
  embed;
  constructor(
    private el: ElementRef
  ) {
    this.init();
  }

  init() {
    this.initElements();
    setTimeout(() => {
      this.setElements();
      this.main();
    }, 0);
  }

  initElements() {
    const lightBox = document.createElement('div');
    lightBox.setAttribute('id', this.lightboxId.toString());
    lightBox.classList.add('lightbox');
    const embed = document.createElement('div');
    embed.setAttribute('id', this.embedId.toString());
    embed.classList.add('embed');
    this.el.nativeElement.appendChild(lightBox);
    this.el.nativeElement.appendChild(embed);
  }

  setElements() {
    this.lightbox = document.getElementById(`${this.lightboxId.toString()}`);
    this.embed = document.getElementById(`${this.embedId.toString()}`);
  }

  main() {
    if (!window['portalHost']) {
      return;
    }
    let initialY = 0;
    let initialWidth = 0;
    window.addEventListener('portalactivate', (evt: any) => {
      console.log('portal activated');
      document.body.classList.add('portal-activated');
      initialY = evt.data.initialY;
      initialWidth = evt.data.initialWidth;
      // animate the audio controller
      console.log('activated');
      this.setPortalActivatedUI(
        evt.data.followed,
        evt.data.name,
        evt.data.photoSrc,
        evt.data.activatedWidth,
        evt.adoptPredecessor()
      );
    });

    console.log('lightbox', this.lightbox);
    this.lightbox.addEventListener('click', evt => {
      this.setPredecessorActivateUI(initialY, initialWidth);
      const predecessor: any = document.querySelector('portal');
      predecessor.activate().then(_ => {
        this.setDefaultUI();
        this.setEmbedUI();
        document.body.classList.remove('portal-activated');
      });
    });

    // Controlling the audio on message
    window['portalHost'].addEventListener('message', evt => {
      // switch (evt.data.control) {
        // case 'prev': this.audioController.prev(); break;
        // case 'play': this.audioController.play(); break;
        // case 'pause': this.audioController.pause(); break;
        // case 'next': this.audioController.next(); break;
        // case 'hide': this.audioController.hide(); break;
      // }
      console.log('event data', evt.data);
      if (evt.data.projectCardWidth) {
        this.initialWidth = this.el.nativeElement.querySelector(this.contentSelector).clientWidth;
        if (this.contentSelector) {
          console.log('initial clientWidth', this.initialWidth);
          this.el.nativeElement.querySelector(this.contentSelector).style.width = `${evt.data.projectCardWidth}px`;
          console.log('changed clientWidth', this.el.nativeElement.querySelector(this.contentSelector).clientWidth);
        }
      }
    });

    this.setEmbedUI();
  }

  /**
   * Setting the default style
   */
  setDefaultUI() {
    // Displaying all the components
    // Need to change the opacity as well for the animation to work
    // this.header.style.display = 'block';
    // this.header.style.opacity = 1;
    // this.detail.style.display = 'block';
    // this.detail.style.opacity = 1;
    // this.follow.style.display = 'none';
    // this.follow.style.opacity = 1;
    // this.recommendation.style.display = 'block';
    // this.recommendation.style.opacity = 1;

    // Resetting all the styles
    // this.main.style.transition = ''
    // this.main.style.width = '100%';
    // this.main.style.marginTop = '0px';
    // this.main.style.boxShadow = 'none';
    // this.main.style.borderRadius = 'none';
    // this.main.style.backgroundColor = '#FFF';
    this.lightbox.style.display = 'none';
    this.lightbox.style.opacity = 0;
    // this.heroImg.style.transition = ''
    // this.heroImg.style.top = '0px';

    // clear any exisiting portal element on reset
    const predecessorPortal = this.embed.querySelector('portal');
    if (predecessorPortal) {
      this.embed.removeChild(predecessorPortal);
    }
  }

  /**
   * Setting the styles when being embedded as a portal
   */
  setEmbedUI() {
    // Hide unnecessary elements when being embedded
    // this.header.style.display = 'none';
    // this.detail.style.display = 'none';
    // this.follow.style.display = 'none';
    // this.recommendation.style.display = 'none';
    document.body.classList.add('hide-scroll-bars');
  }

  /**
   * Setting the styles when being activated from a portal
   * @param {boolean} followed
   * @param {String} name
   * @param {String} photoSrc
   * @param {Number} activatedWidth
   * @param {HTMLPortalElement} predecessor
   */
  setPortalActivatedUI(followed, name, photoSrc, activatedWidth, predecessor) {
    console.log('setPortalActivatedUI');
    console.log(predecessor);
    // Show all the elements
    // this.header.classList.add('animateOpacityTo_1_0');
    // this.header.style.display = 'block';
    // this.detail.style.display = 'block';
    // this.detail.classList.add('animateOpacityTo_1_0');
    // this.recommendation.style.display = 'block';
    // this.recommendation.classList.add('animateOpacityTo_1_0');
    document.body.classList.remove('hide-scroll-bars');
    // Add writer-follow element if the writer was not followed already
    // if (!followed) {
    //     const existingWriterFollow = follow.querySelector('writer-follow');
    //     if (existingWriterFollow) {
    //         this.follow.removeChild(existingWriterFollow);
    //     }
    //     const writerFollow = document.createElement('writer-follow');
    //     writerFollow.setAttribute('writer-name', name);
    //     writerFollow.setAttribute('writer-photo-src', photoSrc);
    //     this.follow.appendChild(writerFollow);
    //     this.follow.style.display = 'block';
    //     this.follow.classList.add('animateOpacityTo_1_0');
    // } else {
    //     this.follow.style.display = 'none';
    // }

    // Change the theme to lightbox style having the predecessor in the back
    // this.main.style.width = `${activatedWidth}px`;
    // this.main.style.marginTop = '50px';
    // this.main.style.boxShadow = '0 -3px 5px rgba(0,0,0,0.19)';
    // this.main.style.borderRadius = '5px 5px 0px 0px';
    this.lightbox.style.display = 'block';
    this.lightbox.style.opacity = 0.6;
    this.lightbox.classList.add('animateOpacityTo_0_6')
    this.embed.appendChild(predecessor);
  }

  /**
   * Setting the styles when activating the predecessor
   * @param {Number} initialY
   * @param {Number} initialWidth
   */
  setPredecessorActivateUI(initialY, initialWidth) {
    // this.main.style.boxShadow = 'none';
    // this.main.style.backgroundColor = 'transparent';
    // this.header.style.opacity = 0;
    // this.detail.style.opacity = 0;
    // this.follow.style.opacity = 0;
    // this.recommendation.style.opacity = 0;
    // // animate
    // this.heroImg.style.transition = 'top 0.6s'
    // this.heroImg.style.top = (window.pageYOffset + initialY - 170) + 'px';
    // this.main.style.transition = 'width 0.3s'
    // this.main.style.width = `${initialWidth}px`;
    // this.audioController.hide();
    if (this.contentSelector) {
      console.log('client width before revert', this.el.nativeElement.querySelector(this.contentSelector).clientWidth);
      // this.el.nativeElement.querySelector(this.contentSelector).style.width = `${this.initialWidth}px`;
      this.el.nativeElement.querySelector(this.contentSelector).style.width = `${100}%`;
      console.log('client width after revert', this.el.nativeElement.querySelector(this.contentSelector).clientWidth);
    }
  }

}
