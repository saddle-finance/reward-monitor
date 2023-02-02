import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
// import PagerDuty from 'pagerduty';

const TABLE_NAME = "RewardMonitorTable";

export async function handler(event) {
    // Create client objects
    const ddbClient = new DynamoDBClient();
    const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
    // const pd = new PagerDuty({
    //     serviceKey: process.env.PAGERDUTY_SERVICE_KEY
    // });

    // Determine the timestamp at the time of the run
    // Used as PK in DynamoDB
    const timestamp = new Date().getTime();

    // Build the params object for the DynamoDB PutItem command
    const exampleParams = buildPutItemParams(
        timestamp, 1, "0x1234567890", "Example Contract", "EXAMPLE", "0x1234567890", 1, 100, 100, 0
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify(exampleParams),
    }

    // Save the data to DynamoDB
    await ddbDocClient.send(new PutCommand(exampleParams)).catch((err) => {
        response.statusCode = 500;
        response.body = `Failed to save data to DynamoDB. Error: ${err}`
    });

    // Return response
    return response
}

function buildPutItemParams(timestamp, chainId, contractAddress, contractName, tokenTicker, tokenAddress, ratePerSecond, currentBalance, runwayInSeconds, rewardDebt) {
    return {
        TableName: TABLE_NAME,
        Item: {
            Timestamp: timestamp,
            ChainId: chainId,
            ContractAddress: contractAddress,
            ContractName: contractName,
            RewardTokenTicker: tokenTicker,
            RewardTokenAddress: tokenAddress,
            RatePerSecond: ratePerSecond,
            CurrentBalance: currentBalance,
            RunwayInSeconds: runwayInSeconds,
            RewardDebt: rewardDebt
        },
    };
}