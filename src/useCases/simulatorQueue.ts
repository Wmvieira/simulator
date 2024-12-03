import { employees } from "../configs/employees";
import { Customer } from "../entities/customer";
import { SimulationResult } from "../entities/simulationResult";

export function simulateQueue(
  customers: Customer[],
  iterationId: number
): SimulationResult {
  const employeeAvailableAt: number[] = Array(employees).fill(0); // Disponibilidade inicial de cada funcionário
  let totalWaitTime = 0; // Tempo total de espera
  let totalQueueTime = 0; // Tempo total na fila (espera + atendimento)
  let totalServiceTime = 0; // Tempo total de serviço
  let totalTime = 0; // Tempo total da simulação

  const waitTimes: number[] = [];
  const queueTimes: number[] = [];

  const queue: Customer[] = [];

  customers.forEach((customer) => {
    const currentTime = customer.arrivalTime;

    // Remove clientes atendidos que já saíram da fila
    while (
      queue.length > 0 &&
      queue[0].arrivalTime + queue[0].serviceTime <= currentTime
    ) {
      queue.shift();
    }

    // Determina o funcionário mais cedo disponível
    const availableEmployeeIndex = employeeAvailableAt.indexOf(
      Math.min(...employeeAvailableAt)
    );

    // Calcula o tempo de espera para o cliente atual
    const waitTime = Math.max(
      0,
      employeeAvailableAt[availableEmployeeIndex] - currentTime
    );
    totalWaitTime += waitTime;
    waitTimes.push(waitTime);

    // Atualiza o tempo em que o funcionário estará disponível
    employeeAvailableAt[availableEmployeeIndex] =
      currentTime + waitTime + customer.serviceTime;

    // Tempo na fila (espera + atendimento)
    const queueTime = waitTime + customer.serviceTime;
    totalQueueTime += queueTime;
    queueTimes.push(queueTime);

    // Tempo total de serviço
    totalServiceTime += customer.serviceTime;

    // Adiciona cliente atual à fila
    queue.push(customer);
  });

  // Tempo total da simulação
  totalTime = Math.max(...employeeAvailableAt) - customers[0].arrivalTime;

  // Métricas finais
  const totalProcessed = customers.length;
  const averageWaitTime = totalWaitTime / totalProcessed;
  const averageQueueLength = totalQueueTime / totalTime;
  const utilizationRate = (totalServiceTime / (totalTime * employees)) * 100;

  return {
    iterationId,
    averageWaitTime,
    utilizationRate,
    totalProcessed,
    totalTime,
    totalWaitTime,
    totalQueueTime,
    averageQueueLength,
  };
}
