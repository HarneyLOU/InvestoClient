import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from 'src/app/app-core/models/Wallet';
import { WalletService } from 'src/app/app-core/services/wallet.service';
import { AddWalletComponent } from '../../wallets/add-wallet/add-wallet.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  form: FormGroup;
  wallet: Wallet;

  constructor(
    public dialogRef: MatDialogRef<AddWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data['name'], [Validators.required]],
      description: [''],
      initMoney: [10000, [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.wallet = {
        name: this.data['name'],
        description: this.form.controls.description.value,
        initMoney: this.form.controls.initMoney.value,
        teamId: this.data['teamId'],
      };
      this.walletService.addUserWallet(this.wallet).subscribe((data) => {
        this.dialogRef.close();
      });
    }
  }
}
