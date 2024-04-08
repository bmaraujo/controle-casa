const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const dbClient = new DynamoDBClient({
    "region": process.env.DBREGION,
    "credentials": {
        "accessKeyId": process.env.DBACCESSKEYID,
        "secretAccessKey": process.env.DBSECRETACCESSKEY
    }
});

const marshallOptions = {
    /**
     * Whether to automatically convert empty strings, blobs, and sets to `null`
     */
    convertEmptyValues: false,
    /**
     * Whether to remove undefined values while marshalling.
     */
    removeUndefinedValues: false,
    /**
     * Whether to convert typeof object to map attribute.
     */
    convertClassInstanceToMap: false,
    /**
     * Whether to convert the top level container
     * if it is a map or list.
     *
     * Default is true when using the DynamoDBDocumentClient,
     * but false if directly using the marshall function (backwards compatibility).
     */
    convertTopLevelContainer: true
}

const unmarshallOptions = {
    /**
     * Whether to return numbers as a string instead of converting them to native JavaScript numbers.
     * This allows for the safe round-trip transport of numbers of arbitrary size.
     */
    wrapNumbers: false,

    /**
     * When true, skip wrapping the data in `{ M: data }` before converting.
     *
     * Default is true when using the DynamoDBDocumentClient,
     * but false if directly using the unmarshall function (backwards compatibility).
     */
    convertWithoutMapWrapper: true
}

const translateConfig = {marshallOptions, unmarshallOptions};

const dynamoDB = DynamoDBDocumentClient.from(dbClient,translateConfig);

module.exports = dynamoDB;