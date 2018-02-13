import {Component, OnInit} from '@angular/core';
import {SeedService} from '../../configurations/seeds';
import {EntityService} from '../../configurations/entities';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  nrOfSeeds: string;
  nrOfEntities: string;

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
