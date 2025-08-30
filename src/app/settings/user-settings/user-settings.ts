import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-user-settings',
  imports: [TuiAvatar],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class UserSettings implements OnInit {

  constructor() { }
  public userName: string = "Bogdan Khamelyuk";



  ngOnInit(): void {
    // call service here to fetch all user data
  }

}
