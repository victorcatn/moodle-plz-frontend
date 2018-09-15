import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moodle-plz';
  startVisible: boolean;
  buttonVisible: boolean;
  inputVisible: boolean;
  listVisible: boolean;
}
