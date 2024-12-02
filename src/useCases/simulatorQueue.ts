import { Customer } from "../entities/customer";

export function simulateQueue(customers: Customer[], iterationId: number) {
  let employeeAvailableAt = 0;

  let totalWaitTime = 0;
  let totalQueueTime = 0;
  let totalServiceTime = 0;
  let totalTime = 0;
  let maxQueueLength = 0;
  let queueLength = 0;

  const waitTimes: number[] = [];
  const queueTimes: number[] = [];

  customers.forEach((customer, index) => {
    const currentTime = customer.arrivalTime;

    const waitTime = Math.max(0, employeeAvailableAt - currentTime);
    totalWaitTime += waitTime;

    employeeAvailableAt = currentTime + waitTime + customer.serviceTime;

    const queueTime = waitTime + customer.serviceTime;
    totalQueueTime += queueTime;

    totalServiceTime += customer.serviceTime;

    queueLength = customers.filter(
      (c) => c.arrivalTime < employeeAvailableAt && c.arrivalTime >= currentTime
    ).length;

    maxQueueLength = Math.max(maxQueueLength, queueLength);

    waitTimes.push(waitTime);
    queueTimes.push(queueTime);
  });

  totalTime = employeeAvailableAt - customers[0].arrivalTime;

  const totalProcessed = customers.length;
  const averageWaitTime = totalWaitTime / totalProcessed;
  const averageQueueLength = totalQueueTime / totalTime;
  const utilizationRate = (totalServiceTime / totalTime) * 100;

  return {
    iterationId,
    averageWaitTime,
    utilizationRate,
    totalProcessed,
    totalTime,
    totalWaitTime,
    totalQueueTime,
    averageQueueLength,
    maxQueueLength,
  };
}
