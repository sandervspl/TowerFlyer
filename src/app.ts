const isACar = (target) => {
  target.isACar = true;
};

@isACar
class Car {
  private brand: string;
  public static isACar: boolean;

  constructor (brand: string) {
    this.brand = brand;
  }

  public getBrand = (): string => this.brand;
}

const car = new Car('Ferrari');

console.log(`${car.getBrand()} is a car: ${Car.isACar}`);
