import {Component, OnInit} from '@angular/core';
import {DateTime} from './commons/';
import {AuthService} from './auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myDate: String;
  isExpertMode: boolean;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  get name(): string {
    return this.authService.name;
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  setExpertMode(bool: boolean) {
    this.isExpertMode = bool;
  }

  getTimestamp() {
    setInterval(() => {
      this.myDate = DateTime.nowUTC();
    }, 1000);
  }

  ngOnInit() {
    this.authService.configureAuth(this.http);
    this.getTimestamp();
  }

}
