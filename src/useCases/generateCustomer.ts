import { Customer } from "../entities/customer";
import { Sample } from "../entities/sample";

export function generateCustomers(sample: Sample): Customer[] {
  const customers: Customer[] = [];
  let currentTime = 0;

  for (let i = 0; i < sample.interArrivalTimes.length; i++) {
    const arrivalTime = currentTime + sample.interArrivalTimes[i];
    const serviceTime = sample.serviceTime[i % sample.serviceTime.length];
    customers.push({ arrivalTime, serviceTime });
    currentTime = arrivalTime;
  }

  return customers;
}
