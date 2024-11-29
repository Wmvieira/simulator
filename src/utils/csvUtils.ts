import fs from "fs";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";

export function readCSV(filePath: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const data: number[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        const value = parseFloat(Object.values(row)[0] as string);
        if (!isNaN(value)) {
          data.push(value);
        }
      })
      .on("end", () => resolve(data))
      .on("error", (error) => reject(error));
  });
}

export function writeCSV(filePath: string, data: object[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    csvWriter
      .writeRecords(data)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
