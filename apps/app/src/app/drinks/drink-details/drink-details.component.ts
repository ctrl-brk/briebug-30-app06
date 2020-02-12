import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Drink } from '@app/data';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html'
})
export class DrinkDetailsComponent implements OnInit {
  form: FormGroup;
  currentDrink: Drink;
  originalTitle;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set drink(value) {
    if (value) this.originalTitle = value.title;
    this.currentDrink = Object.assign({}, value)
    this.initForm();
    console.log(this.form);
  }

  get showTooltip(): boolean {
    return !this.form.valid && (!this.form.pristine || this.form.touched);
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this._fb.group({
      title: [this.currentDrink?.title, Validators.required],
      details: [this.currentDrink?.details, Validators.required],
    });
  }

  onSubmit() {
    this.saved.emit(this.form.value);
  }

  onCancel() {
    this.cancelled.emit(this.form.value);
  }
}
