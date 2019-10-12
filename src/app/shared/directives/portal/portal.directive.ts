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
  initialY = 0;
  lightbox;
  embed;
  projectCard;
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
    let initialWidth = 0;
    window.addEventListener('portalactivate', (evt: any) => {
      document.body.classList.add('portal-activated');
      this.initialY = evt.data.initialY;
      initialWidth = evt.data.initialWidth;
      // animate the audio controller
      this.setPortalActivatedUI(
        evt.adoptPredecessor()
      );
    });

    this.projectCard = this.el.nativeElement.querySelector(this.contentSelector);

    this.projectCard.addEventListener('transitionend', (evt) => {
      // We wait until the top transition finishes
      if (evt.propertyName !== 'top') {
          return;
      }
      const predecessor: any = document.querySelector('portal');
      predecessor.activate().then(_ => {
        this.setDefaultUI();
        this.setEmbedUI();
        document.body.classList.remove('portal-activated');
      });
    });

    this.lightbox.addEventListener('click', evt => {
      this.setPredecessorActivateUI(this.initialY, initialWidth);
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

    this.projectCard.style.transition = '';
    this.projectCard.style.top = '20px';
    this.projectCard.style.width = `${100}%`;

    this.projectCard.classList.remove('animateOpacityTo_1_0');
    this.lightbox.classList.remove('animateOpacityTo_6_0');

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
    // set project card's transition
    if (this.contentSelector) {
      this.projectCard.style.transition = `top 0.6s cubic-bezier(.49,.86,.37,1.01),
      width 0.3s cubic-bezier(.49,.86,.37,1.01),
      padding-top 0.3s cubic-bezier(.49,.86,.37,1.01)`;
    }
    this.lightbox.classList.add('animateOpacityTo_0_6');
    this.embed.appendChild(predecessor);
  }

  setPredecessorActivateUI(initialY, initialWidth) {
    this.projectCard.classList.remove('animateOpacityTo_0_1');
    this.lightbox.classList.remove('animateOpacityTo_0_6');
    setTimeout(() => {
      this.lightbox.classList.add('animateOpacityTo_6_0');
      this.projectCard.style.top = `${initialY}px`;
    }, 0);
  }

}
