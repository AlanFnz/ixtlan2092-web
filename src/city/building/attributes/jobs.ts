import { City } from '../..';
import CONFIG from '../../../config';
import { Citizen } from '../../citizen';
import { Zone } from '../zone';
import { DevelopmentState } from './development';

export class JobsAttribute {
  private zone: Zone;
  workers: Citizen[] = [];

  constructor(zone: Zone) {
    this.zone = zone;
  }

  get maxWorkers(): number {
    // If building is not developed, there are no available jobs
    if (
      this.zone.development.state === DevelopmentState.ABANDONED ||
      this.zone.development.state === DevelopmentState.UNDEVELOPED
    ) {
      return 0;
    } else {
      return Math.pow(CONFIG.ZONE.MAX_WORKERS, this.zone.development.level);
    }
  }

  get availableJobs(): number {
    return this.maxWorkers - this.workers.length;
  }

  get filledJobs(): number {
    return this.workers.length;
  }

  update(city: City): void {
    // if building is abandoned, all workers are laid off and no
    // more workers are allowed to work here
    if (this.zone.development.state === DevelopmentState.ABANDONED) {
      this.layOffWorkers();
    }
  }

  layOffWorkers(): void {
    for (const worker of this.workers) {
      worker.setWorkplace(null);
    }
    this.workers = [];
  }

  dispose(): void {
    this.layOffWorkers();
  }

  toHTML(): string {
    let html = `<div class="info-heading">Workers (${this.filledJobs}/${this.maxWorkers})</div>`;

    html += '<ul class="info-citizen-list">';
    for (const worker of this.workers) {
      html += worker.toHTML();
    }
    html += '</ul>';

    return html;
  }
}

