export type Customer = {
  arrivalTime: number;
  serviceTime: number;
};

export type CustomerEnded = {
  arrivalTime: number;
  serviceTime: number;
  waitTime: number;
  startTime: number;
  endTime: number;
};
