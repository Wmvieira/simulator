import { Customer } from "../entities/customer";
import { Sample } from "../entities/sample";

export function generateCustomers(sample: Sample): Customer[] {
  const customers: Customer[] = [];

  let currentArrivalTime = 0;

  for (let i = 0; i < sample.interArrivalTimes.length; i++) {
    currentArrivalTime += sample.interArrivalTimes[i];

    const serviceTime = sample.serviceTime[i];
    customers.push({ arrivalTime: currentArrivalTime, serviceTime });
  }

  return customers;
}
