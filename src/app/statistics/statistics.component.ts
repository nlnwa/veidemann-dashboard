import {Component, OnInit} from "@angular/core";
import {StatisticsService} from "./statistics.service";
import {Seed} from "../seeds/seed";
import {Entity} from "../models/entity";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  seeds: Seed[];
  entities: Entity[];

  constructor(private statisticsservice: StatisticsService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.statisticsservice.getSeeds().subscribe(seeds => {
      this.seeds = seeds.count
    });
    this.statisticsservice.getEntities().subscribe(entities => {
      this.entities = entities.count
    });


  }
}
