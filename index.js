import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import PagerDuty from 'pagerduty';

const BUCKET_NAME = "reward-monitor-bucket"

export async function handler(event) {
    const s3 = new S3Client();
    // const pd = new PagerDuty({
    //     serviceKey: process.env.PAGERDUTY_SERVICE_KEY
    // });

    const fileName = new Date().toISOString().slice(0, 10) + '.json';

    const fileContent = {
        data: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' }
        ]
    };
    const fileBody = JSON.stringify(fileContent);

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: fileBody
    };

    const response = {
        statusCode: 200,
        body: fileBody,
    }

    // Upload to S3
    await s3.send(new PutObjectCommand(params)).catch((err) => {
        response.statusCode = 500;
        response.body = `Failed to save JSON output to ${BUCKET_NAME}/${fileName}. Error: ${err}`
    });

    return response
}