import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import PagerDuty from 'pagerduty';

export async function handler(event) {
    // Create client objects
    const ddbClient = new DynamoDBClient();
    // const pd = new PagerDuty({
    //     serviceKey: process.env.PAGERDUTY_SERVICE_KEY
    // });

    // Determine the timestamp at the time of the run
    // Used as PK in DynamoDB
    const timestamp = new Date().getTime().toString();

    // Build the params object for the DynamoDB PutItem command
    const exampleParams = buildPutItemParams(
        timestamp, 1, "0x1234567890", "Example Contract", "EXAMPLE", "0x1234567890", 1, 100, 100, 0
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify(exampleParams),
    }

    // Save the data to DynamoDB
    await ddbClient.send(new PutItemCommand(exampleParams)).catch((err) => {
        response.statusCode = 500;
        response.body = `Failed to save data to DynamoDB. Error: ${err}`
    });

    // Return response
    return response
}

function buildPutItemParams(timestamp, chainId, contractAddress, contractName, tokenTicker, tokenAddress, ratePerSecond, currentBalance, runwayInSeconds, rewardDebt) {
    return {
        TableName: "RewardMonitorTable",
        Item: {
            Timestamp: { N: timestamp },
            ChainId: { N: chainId },
            ContractAddress: { S: contractAddress },
            ContractName: { S: contractName },
            RewardTokenTicker: { S: tokenTicker },
            RewardTokenAddress: { S: tokenAddress },
            RatePerSecond: { N: ratePerSecond },
            CurrentBalance: { N: currentBalance },
            RunwayInSeconds: { N: runwayInSeconds },
            RewardDebt: { N: rewardDebt }
        },
    };
}