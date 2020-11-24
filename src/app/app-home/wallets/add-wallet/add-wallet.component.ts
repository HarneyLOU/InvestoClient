import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from './../../../app-core/services/wallet.service';
import { Wallet } from './../../../app-core/models/Wallet';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss'],
})
export class AddWalletComponent implements OnInit {
  form: FormGroup;
  wallet: Wallet;

  constructor(
    public dialogRef: MatDialogRef<AddWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Wallet[],
    private formBuilder: FormBuilder,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
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
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        initMoney: this.form.controls.initMoney.value,
      };
      this.walletService.addUserWallet(this.wallet).subscribe((data) => {
        this.data['wallets'].push(data);
        this.dialogRef.close();
      });
    }
  }
}
