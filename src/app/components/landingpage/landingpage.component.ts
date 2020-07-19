import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  mostLiked;
  mostCommented;

  constructor(
    private auth: AuthenticationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Scribe | Get started!');
  }
}
