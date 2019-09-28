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
      document.body.classList.add('portal-activated');
      initialY = evt.data.initialY;
      initialWidth = evt.data.initialWidth;
      // animate the audio controller
      this.setPortalActivatedUI(
        evt.adoptPredecessor()
      );
    });

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
      if (evt.data.projectCardWidth) {
        this.initialWidth = this.el.nativeElement.querySelector(this.contentSelector).clientWidth;
        if (this.contentSelector) {
          this.el.nativeElement.querySelector(this.contentSelector).style.width = `${evt.data.projectCardWidth}px`;
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
    this.lightbox.style.display = 'none';
    this.lightbox.style.opacity = 0;

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
    document.body.classList.add('hide-scroll-bars');
  }

  setPortalActivatedUI(predecessor) {
    document.body.classList.remove('hide-scroll-bars');
    // Change the theme to lightbox style having the predecessor in the back
    this.lightbox.style.display = 'block';
    this.lightbox.style.opacity = 0.6;
    this.lightbox.classList.add('animateOpacityTo_0_6');
    this.embed.appendChild(predecessor);
  }

  setPredecessorActivateUI(initialY, initialWidth) {
    if (this.contentSelector) {
      this.el.nativeElement.querySelector(this.contentSelector).style.width = `${100}%`;
    }
  }

}
