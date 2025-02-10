import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Car } from "../../models/car.model";

@Component({
  selector: 'app-car-form',
  standalone: false,
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit {
  public carForm!: FormGroup;
  imagePreview: string | null = null;

  @Input() car: Car | null = null;
  @Output() addCar = new EventEmitter<Car>();
  @Output() submitForm = new EventEmitter<Car>();

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      marque: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      modele: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      couleur: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      image: this.fb.control(null)
    });

    if (this.car) {
      this.carForm.patchValue(this.car);
      this.imagePreview = typeof this.car.image === 'string' ? this.car.image : null;
    }
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.submitForm.emit(this.carForm.value);
    }
    this.router.navigate(['/accueil']);
  }

  onImageChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.carForm.patchValue({ image: reader.result });
        this.imagePreview = reader.result as string;
      };
    }
  }
}
