import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carUrl = 'assets/json/cars.json';
  private storageKey = 'cars';

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    if (!localStorage.getItem(this.storageKey)) {
      this.http.get<Car[]>(this.carUrl).pipe(
        tap(cars => {
          console.log('Cars loaded:', cars);
          this.saveCars(cars);
        })
      ).subscribe();
    }
  }

  getCars(): Car[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getCarbyId(id: number): Car | null {
    const cars = this.getCars();
    return cars.find((c) => c.id === id) || null;
  }

  addCar(car: Car): void {
    const cars = this.getCars();
    const newCar = {
      ...car,
      id: this.generateId(),
      image: car.image || 'assets/images/default_car.jpg'
    };
    cars.push(newCar);
    this.saveCars(cars);
  }

  updateCar(car: Car): void {
    const cars = this.getCars();
    const index = cars.findIndex((c) => c.id === car.id);
    if (index !== -1) {
      cars[index] = car;
      this.saveCars(cars);
    }
  }

  deleteCar(id: number): void {
    const cars = this.getCars();
    const index = cars.findIndex((c) => c.id === id);
    if (index !== -1) {
      cars.splice(index, 1);
      this.saveCars(cars);
    }
  }

  generateId(): number {
    const cars = this.getCars();
    return cars.length ? Math.max(...cars.map((car) => car.id)) + 1 : 1;
  }

  private saveCars(cars: Car[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cars));
  }
}
