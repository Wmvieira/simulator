import { employees } from "../configs/employees";
import { Customer, CustomerEnded } from "../entities/customer";
import {
  CustomerResults,
  SimulationResult,
} from "../entities/simulationResult";

export function simulateQueue(
  customers: Customer[],
  iterationId: number
): { result: SimulationResult; customers: CustomerResults } {
  const employeeAvailableAt: number[] = Array(employees).fill(0);
  let totalWaitTime = 0;
  let totalQueueTime = 0;
  let totalServiceTime = 0;
  let totalTime = 0;

  const customersEnded: CustomerEnded[] = [];

  const waitTimes: number[] = [];
  const queueTimes: number[] = [];

  const queue: Customer[] = [];

  customers.forEach((customer) => {
    const currentTime = customer.arrivalTime;

    while (
      queue.length > 0 &&
      queue[0].arrivalTime + queue[0].serviceTime <= currentTime
    ) {
      queue.shift();
    }

    const availableEmployeeIndex = employeeAvailableAt.indexOf(
      Math.min(...employeeAvailableAt)
    );

    const waitTime = Math.max(
      0,
      employeeAvailableAt[availableEmployeeIndex] - currentTime
    );
    totalWaitTime += waitTime;
    waitTimes.push(waitTime);

    employeeAvailableAt[availableEmployeeIndex] =
      currentTime + waitTime + customer.serviceTime;

    const queueTime = waitTime + customer.serviceTime;
    totalQueueTime += queueTime;
    queueTimes.push(queueTime);

    totalServiceTime += customer.serviceTime;

    customersEnded.push({
      ...customer,
      waitTime,
      startTime: employeeAvailableAt[availableEmployeeIndex] - queueTime,
      endTime: employeeAvailableAt[availableEmployeeIndex],
    });

    queue.push(customer);
  });

  totalTime = Math.max(...employeeAvailableAt) - customers[0].arrivalTime;

  const totalProcessed = customers.length;
  const averageWaitTime = totalWaitTime / totalProcessed;
  const averageQueueLength = totalQueueTime / totalTime;
  const utilizationRate = (totalServiceTime / (totalTime * employees)) * 100;

  return {
    result: {
      iterationId,
      averageWaitTime,
      utilizationRate,
      totalProcessed,
      totalTime,
      totalWaitTime,
      totalQueueTime,
      averageQueueLength,
    },
    customers: { curtomers: customersEnded, iterationId },
  };
}
