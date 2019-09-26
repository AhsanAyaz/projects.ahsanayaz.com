import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../../core/services/github-api/github-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aa-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  isPortal = false;
  constructor(
    private githubApi: GithubApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.getProject(params.id);
      });
    this.route.queryParams
      .subscribe(params => {
        this.isPortal = !!params.portal;
        if (this.isPortal) {
          document.body.classList.add('is-portal');
        } else {
          document.body.classList.remove('is-portal');
        }
      });
  }

  getProject(id) {
    this.githubApi.getProjects()
      .subscribe(projects => {
        // tslint:disable-next-line:triple-equals
        this.project = projects.find(proj => proj.id == id);
      });
  }

}


// /**
//  * TTT Controller
//  * Controlling all the TTT related features
//  */
// class TTTController {

//   /**
//    * Initiating controller
//    */
//   constructor() {
//       // All the UI references
//       this.main = document.querySelector('#main');
//       this.header = document.querySelector('#header');
//       this.detail = document.querySelector('#detail');
//       this.follow = document.querySelector('#follow');
//       this.recommendation = document.querySelector('#recommendation');
//       this.lightbox = document.querySelector('#lightbox');
//       this.embed = document.querySelector('#embed');
//       this.heroImg = document.querySelector('#hero-img');
//       this.audioController = document.querySelector('audio-controller');

//       // Add event listeners
//       let initialY = 0;
//       let initialWidth = 0;
//       window.addEventListener('portalactivate', evt => {
//           initialY = evt.data.initialY;
//           initialWidth = evt.data.initialWidth;
//           // animate the audio controller
//           this.audioController.show();
//           this.setPortalActivatedUI(
//               evt.data.followed,
//               evt.data.name,
//               evt.data.photoSrc,
//               evt.data.activatedWidth,
//               evt.adoptPredecessor()
//           )
//       })

//       this.lightbox.addEventListener('click', evt => {
//           this.setPredecessorActivateUI(initialY, initialWidth);
//       })

//       this.heroImg.addEventListener('transitionend', evt => {
//           if (evt.propertyName !== 'top') {
//               return;
//           }
//           const predecessor = document.querySelector('portal');
//           predecessor.activate().then(_ => {
//               this.audioController.show();
//               this.setDefaultUI();
//               this.setEmbedUI();
//           });
//       })

//       // Controlling the audio on message
//       window.portalHost.addEventListener('message', evt => {
//           switch (evt.data.control) {
//               case 'prev': this.audioController.prev(); break;
//               case 'play': this.audioController.play(); break;
//               case 'pause': this.audioController.pause(); break;
//               case 'next': this.audioController.next(); break;
//               case 'hide': this.audioController.hide(); break;
//           }
//       })
//   }

//   /**
//    * Setting the default style
//    */
//   setDefaultUI() {
//       // Displaying all the components
//       // Need to change the opacity as well for the animation to work
//       this.header.style.display = 'block';
//       this.header.style.opacity = 1;
//       this.detail.style.display = 'block';
//       this.detail.style.opacity = 1;
//       this.follow.style.display = 'none';
//       this.follow.style.opacity = 1;
//       this.recommendation.style.display = 'block';
//       this.recommendation.style.opacity = 1;

//       // Resetting all the styles
//       this.main.style.transition = ''
//       this.main.style.width = '100%';
//       this.main.style.marginTop = '0px';
//       this.main.style.boxShadow = 'none';
//       this.main.style.borderRadius = 'none';
//       this.main.style.backgroundColor = '#FFF';
//       this.lightbox.style.display = 'none';
//       this.lightbox.style.opacity = 0;
//       this.heroImg.style.transition = ''
//       this.heroImg.style.top = '0px';

//       // clear any exisiting portal element on reset
//       const predecessorPortal = this.embed.querySelector('portal');
//       if (predecessorPortal) {
//           this.embed.removeChild(predecessorPortal);
//       }
//   }

//   /**
//    * Setting the styles when being embedded as a portal
//    */
//   setEmbedUI() {
//       // Hide unnecessary elements when being embedded
//       this.header.style.display = 'none';
//       this.detail.style.display = 'none';
//       this.follow.style.display = 'none';
//       this.recommendation.style.display = 'none';
//       document.body.classList.add('hide-scroll-bars');
//   }

//   /**
//    * Setting the styles when being activated from a portal
//    * @param {boolean} followed
//    * @param {String} name
//    * @param {String} photoSrc
//    * @param {Number} activatedWidth
//    * @param {HTMLPortalElement} predecessor
//    */
//   setPortalActivatedUI(followed, name, photoSrc, activatedWidth, predecessor) {
//       // Show all the elements
//       this.header.classList.add('animateOpacityTo_1_0');
//       this.header.style.display = 'block';
//       this.detail.style.display = 'block';
//       this.detail.classList.add('animateOpacityTo_1_0');
//       this.recommendation.style.display = 'block';
//       this.recommendation.classList.add('animateOpacityTo_1_0');
//       document.body.classList.remove('hide-scroll-bars');

//       // Add writer-follow element if the writer was not followed already
//       if (!followed) {
//           const existingWriterFollow = follow.querySelector('writer-follow');
//           if (existingWriterFollow) {
//               this.follow.removeChild(existingWriterFollow);
//           }
//           const writerFollow = document.createElement('writer-follow');
//           writerFollow.setAttribute('writer-name', name);
//           writerFollow.setAttribute('writer-photo-src', photoSrc);
//           this.follow.appendChild(writerFollow);
//           this.follow.style.display = 'block';
//           this.follow.classList.add('animateOpacityTo_1_0');
//       } else {
//           this.follow.style.display = 'none';
//       }

//       // Change the theme to lightbox style having the predecessor in the back
//       this.main.style.width = `${activatedWidth}px`;
//       this.main.style.marginTop = '50px';
//       this.main.style.boxShadow = '0 -3px 5px rgba(0,0,0,0.19)';
//       this.main.style.borderRadius = '5px 5px 0px 0px';
//       this.lightbox.style.display = 'block';
//       this.lightbox.style.opacity = 0.6;
//       this.lightbox.classList.add('animateOpacityTo_0_6')
//       this.embed.appendChild(predecessor);
//   }

//   /**
//    * Setting the styles when activating the predecessor
//    * @param {Number} initialY
//    * @param {Number} initialWidth
//    */
//   setPredecessorActivateUI(initialY, initialWidth) {
//       this.main.style.boxShadow = 'none';
//       this.main.style.backgroundColor = 'transparent';
//       this.header.style.opacity = 0;
//       this.detail.style.opacity = 0;
//       this.follow.style.opacity = 0;
//       this.recommendation.style.opacity = 0;
//       // animate
//       this.heroImg.style.transition = 'top 0.6s'
//       this.heroImg.style.top = (window.pageYOffset + initialY - 170) + 'px';
//       this.main.style.transition = 'width 0.3s'
//       this.main.style.width = `${initialWidth}px`;
//       this.audioController.hide();
//   }

// }

// // Initiate the controller when being embedded as a portal
// if (window.portalHost) {
//   const controller = new TTTController();
//   controller.setEmbedUI();
// } else if (window.self !== window.top) {
//   // iframe fallback
//   document.querySelector('#header').style.display = 'none';
//   document.querySelector('#detail').style.display = 'none';
//   document.querySelector('#follow').style.display = 'none';
//   document.querySelector('#recommendation').style.display = 'none';
//   document.body.style.overflow = 'hidden';
// } else {
//   // This page isn't being embedded, so do nothing.
// }
