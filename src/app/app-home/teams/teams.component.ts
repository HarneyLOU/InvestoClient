import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Team } from 'src/app/app-core/models/Team';
import { TeamsService } from '../../app-core/services/teams.service';
import { CreateTeamComponent } from './create-team/create-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  joinControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  constructor(
    private teamsService: TeamsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamsService.getUserTeams().subscribe((data) => {
      this.teams = data;
    });
  }

  onCreate() {
    if (this.nameControl.valid) {
      const team: Team = {
        name: this.nameControl.value,
      };
      this.teamsService.addTeam(team).subscribe((data) => {
        if (data as Team) {
          const dialogRef = this.dialog.open(CreateTeamComponent, {
            width: '300px',
            data: { teamId: data.teamId, name: data.name },
          });
          this.nameControl.setValue('');
          this.openSnackBar(data.code);
          this.teams.push(data);
        }
      });
    }
  }

  onJoin() {
    if (this.joinControl.valid) {
      this.teamsService.joinTeam(this.joinControl.value).subscribe((data) => {
        if (data as Team) {
          this.openSnackBar('Successfully added');
          this.teams.push(data);
        } else this.openSnackBar('Team not found');
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2500,
    });
  }
}
