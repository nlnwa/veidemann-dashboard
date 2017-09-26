import {Component, OnInit} from '@angular/core';
import {SeedService} from '../seeds/seeds.service';
import {EntityService} from '../entities/entity.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  nrOfSeeds: number;
  nrOfEntities: number;

  constructor(private seedsService: SeedService,
              private entityService: EntityService) {}

  ngOnInit() {
    this.seedsService.list().subscribe(reply => {
      this.nrOfSeeds = reply.count;
    });
    this.entityService.list().subscribe(reply => {
      this.nrOfEntities = reply.count;
    });
  }
}
