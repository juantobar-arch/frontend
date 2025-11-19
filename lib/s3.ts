import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: "us-east-1", // cámbialo si tu bucket está en otra región
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function streamToString(stream: Readable) {
  return new Promise<string>((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

/**
 * Descarga y parsea un archivo JSON desde S3
 */
export async function getJsonFromS3(bucket: string, key: string) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const response = await s3.send(command);

  if (!response.Body || !(response.Body instanceof Readable)) {
    throw new Error("El cuerpo de la respuesta no es un stream válido.");
  }

  const bodyString = await streamToString(response.Body);
  return JSON.parse(bodyString);
}
