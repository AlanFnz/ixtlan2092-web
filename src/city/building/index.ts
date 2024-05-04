import { createCitizen } from '../citizen';
import { Citizen } from '../citizen/constants';
import { City } from '../constants';
import { BUILDING_TYPE, Building } from './constants';

function createBuilding(buildingType: keyof typeof BUILDING_TYPE): Building {
  const buildings = {
    [BUILDING_TYPE.RESIDENTIAL]: {
      id: crypto.randomUUID(),
      type: BUILDING_TYPE.RESIDENTIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,

      citizens: [] as Citizen[],
      maxCitizens: 4,

      update(city: City) {
        if (this.citizens.length < this.maxCitizens) {
          const citizen = createCitizen(this.id);
          this.citizens.push(citizen);
          city.citizens.push(citizen);
        }

        if (Math.random() < 0.01 && this.height && this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      },
      toHTML() {
        return toHTML(this);
      },
    },
    [BUILDING_TYPE.COMMERCIAL]: {
      id: crypto.randomUUID(),
      name: 'Commercial',
      type: BUILDING_TYPE.COMMERCIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,

      workers: [] as Citizen[],
      maxWorkers: 4,

      getNumberOfJobsAvailable() {
        return this.maxWorkers - this.workers.length;
      },
      getNumberOfJobsFilled() {
        return this.workers.length;
      },
      update() {
        if (Math.random() < 0.01 && this.height && this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      },
      toHTML() {
        return toHTML(this);
      },
    },
    [BUILDING_TYPE.INDUSTRIAL]: {
      id: crypto.randomUUID(),
      name: 'Industrial',
      type: BUILDING_TYPE.INDUSTRIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,

      workers: [] as Citizen[],
      maxWorkers: 4,

      getNumberOfJobsAvailable() {
        return this.maxWorkers - this.workers.length;
      },
      getNumberOfJobsFilled() {
        return this.workers.length;
      },
      update() {
        if (Math.random() < 0.01 && this.height && this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      },
      toHTML() {
        return toHTML(this);
      },
    },
    [BUILDING_TYPE.ROAD]: {
      id: crypto.randomUUID(),
      type: BUILDING_TYPE.ROAD,
      style: Math.floor(3 * Math.random()) + 1,
      updated: true,
      update: function () {
        this.updated = false;
      },
      toHTML() {
        return toHTML(this);
      },
    },
  };

  function toHTML(building: Building): string {
    let html = '';
    html += '<br><strong>Building</strong><br>';
    html += `Type: ${building.type}<br>`;
    html += `Style: ${building.style}<br>`;
    if (building.height) html += `Height: ${building.height}<br>`;

    if (building.citizens) {
      if (building.citizens.length > 0) {
        html += `<br><strong>Residents</strong>`;

        html += '<ul style="margin-top: 0; padding-left: 20px;">';
        for (const citizen of building.citizens) {
          html += citizen.toHTML();
        }
      } else {
        html += '<li>None</li>';
      }
      html += '</ul>';
    }

    if (building.workers) {
      if (building.getNumberOfJobsFilled) {
        html += `<br><strong>Workers (${building.getNumberOfJobsFilled()}/${
          building.maxWorkers
        })</strong>`;
      }

      html += '<ul style="margin-top: 0; padding-left: 20px;">';
      if (building.workers.length > 0) {
        for (const worker of building.workers) {
          html += worker.toHTML();
        }
      } else {
        html += '<li>None</li>';
      }
      html += '</ul>';
    }

    return html;
  }

  return buildings[buildingType] || buildings[BUILDING_TYPE.ROAD];
}

export { createBuilding };

