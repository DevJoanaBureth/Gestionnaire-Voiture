import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-edit',
  standalone: false,
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.css'
})
export class CarEditComponent implements OnInit {

  car: Car | null = null;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const car = this.carService.getCars().find((c) => c.id === id);

    if (car) {
      this.car = car;
    } else {
      this.router.navigate(['/accueil']);
    }
  }

  handleSubmit(updatedData: any): void {
    const updatedCar = {
      ...this.car,
      ...updatedData,
    };

    this.carService.updateCar(updatedCar);
    this.router.navigate(['/accueil']);
  }
}
