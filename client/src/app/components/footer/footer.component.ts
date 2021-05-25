import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faEnvelope = faEnvelope;
}
