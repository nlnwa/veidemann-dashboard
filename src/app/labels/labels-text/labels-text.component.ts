import {OnInit} from '@angular/core';

export class LabelsText implements OnInit {

  newLabelValueTooltip = 'En verdi gir en merkelapp. Den brukes for å merke og identifisere en entitet eller seed.\n' +
    '    Eks. offentlig nettsted, nettavis, Valg 2017';

  newLabelKeyTooltip = 'Hva skal merkelappen beskrive?\n' +
    '    Eks. Org.nummer, kategorisering, begivenhet';

  constructor() { }

  ngOnInit() {
  }

}
