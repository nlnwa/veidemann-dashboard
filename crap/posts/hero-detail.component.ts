import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Role, Hero } from './data-model';
import { HeroService }           from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;

  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService) {

    this.createForm();
   // this.logNameChange();
  }

  createForm() {
    console.log("createform");
    this.heroForm = this.fb.group({
      name: '',
//      roles: this.fb.array([]),
      meta: this.fb.group({
        roles: this.fb.array([])
      })
    });
  }

  ngOnChanges() {
    console.log("change");
    this.heroForm.reset({
      name: this.hero.name,
      meta: {

        roles: this.setAddresses(this.hero.meta.roles),
      },
    });
    //this.setAddresses(this.hero.meta.roles);
  }

  get secretLairs(): FormArray {
    console.log("called");
    return this.heroForm.get('roles') as FormArray;
  };

  setAddresses(roles: Role[]) {
    console.log("setaddr");
    const addressFGs = roles.map(role => this.fb.group(role));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('roles', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Role()));
  }

  onSubmit() {
    console.log(this.hero);
    //this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  createUser() {
    console.log(this.hero);
  }



  revert() { this.ngOnChanges(); }

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
