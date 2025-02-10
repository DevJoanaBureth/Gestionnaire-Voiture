import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  standalone: false,
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent {
  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  handleSubmit(carData: any): void {
    const newCar = {
      id: this.carService.generateId(),
      ...carData,
    };

    this.carService.addCar(newCar);
    this.router.navigate(['/']);
  }
}
