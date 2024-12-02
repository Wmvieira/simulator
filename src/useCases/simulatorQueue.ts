import { employees } from "../configs/employees";
import { Customer } from "../entities/customer";
import { SimulationResult } from "../entities/simulationResult";

export function simulateQueue(
  customers: Customer[],
  iterationId: number
): SimulationResult {
  const serverEndTimes = Array(employees).fill(0);
  let totalWaitTime = 0;
  let totalProcessed = 0;
  let totalQueueLength = 0;
  let totalTimeUnits = 0;
  let maxQueueLength = 0;
  const idleTimes = Array(employees).fill(0);

  const queue: Customer[] = [];

  customers.forEach((customer) => {
    queue.push(customer);

    maxQueueLength = Math.max(maxQueueLength, queue.length);

    const nextAvailableServer = serverEndTimes.indexOf(
      Math.min(...serverEndTimes)
    );
    const startServiceTime = Math.max(
      customer.arrivalTime,
      serverEndTimes[nextAvailableServer]
    );
    const waitTime = Math.max(0, startServiceTime - customer.arrivalTime);
    totalWaitTime += waitTime;

    if (serverEndTimes[nextAvailableServer] < customer.arrivalTime) {
      idleTimes[nextAvailableServer] +=
        customer.arrivalTime - serverEndTimes[nextAvailableServer];
    }

    serverEndTimes[nextAvailableServer] =
      startServiceTime + customer.serviceTime;
    totalProcessed++;

    totalQueueLength += queue.length;
    totalTimeUnits++;
    queue.shift();
  });

  const totalTime = Math.max(...serverEndTimes);
  const utilizationRate =
    serverEndTimes.reduce((sum, endTime) => sum + endTime, 0) /
    (employees * totalTime);

  const averageQueueLength = totalQueueLength / totalTimeUnits;

  return {
    iterationId,
    averageWaitTime: totalWaitTime / totalProcessed,
    utilizationRate,
    totalProcessed,
    totalTime,
    totalWaitTime,
    averageQueueLength,
    maxQueueLength,
    idleTimes,
  };
}
