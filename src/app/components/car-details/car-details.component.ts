import { Component, Input } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-details',
  standalone: false,
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent{
  @Input() selectedCar: Car | null = null;

  constructor(private carService: CarService) {}

  deleteCar(id: number): void {
    if (confirm('Voulez-vous supprimer cette voiture ?')) {
      this.carService.deleteCar(id);
      if (this.selectedCar?.id === id) {
        this.selectedCar = null;
      }
    }
  }
}
