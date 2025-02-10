import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-list',
  standalone: false,
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  selectedCar: Car | null = null;

  @Output() selectedCarChange = new EventEmitter<Car>();

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.cars = this.carService.getCars();
  }

  deleteCar(id: number): void {
    if (confirm('Voulez-vous supprimer cette voiture ?')) {
      this.cars = this.cars.filter(car => car.id !== id);

      this.saveCars();

      if (this.selectedCar?.id === id) {
        this.selectedCar = null;
      }
    }
  }

  saveCars() {
    localStorage.setItem('cars', JSON.stringify(this.cars));
  }

  selectCar(car: Car): void {
    const foundCar = this.carService.getCarbyId(car.id);
    this.selectedCar = foundCar;
  }
}
