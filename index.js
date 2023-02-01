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

    s3.upload(params, function (err, data) {
        if (err) {
            console.error(err);
            // S3 upload failed
        } else {
            console.log(`Successfully saved JSON output to ${bucketName}/${fileName}`);
        }
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda and Github!"),
    }
    return response
}