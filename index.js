import AWS from 'aws-sdk';
import PagerDuty from 'pagerduty';

const BUCKET_NAME = "reward-monitor-bucket"

export async function handler(event) {
    const s3 = new AWS.S3();
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

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: JSON.stringify(fileContent)
    };

    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda and Github!"),
    }

    await s3.upload(params).promise().then((data) => {
        response.body = `Successfully saved JSON output to ${bucketName}/${fileName}`
    }).catch((err) => {
        response.statusCode = 500;
        response.body = `Failed to save JSON output to ${bucketName}/${fileName}. Error: ${err}`
    });

    return response
}