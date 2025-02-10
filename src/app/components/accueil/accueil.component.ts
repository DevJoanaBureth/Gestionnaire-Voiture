import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  cars: Car[] = [];
  selectedCar: Car | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
  }

  addCarToList(newCar: Car): void {
    this.carService.addCar(newCar);
    this.cars = this.carService.getCars();
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
  }
}
