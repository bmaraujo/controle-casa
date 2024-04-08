const http_status = require('http-status-codes');
const express = require('express')
var bodyParser = require('body-parser')
const { ScanCommand, PutCommand, DeleteCommand, GetCommand } = require('@aws-sdk/lib-dynamodb')
const dynamoDB = require('../middleware/dynamoDBClient');
require("dotenv").config();

const router = express.Router()
const StatusCodes = http_status.StatusCodes;

const tableName = "categorias_despesa";

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',async (req, res) => {
  try {
    const response = await dynamoDB.send(new ScanCommand({
      "TableName" : tableName
    }));
    res
      .status(StatusCodes.OK)
      .send(response.Items);
  } catch (error) {npm
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    
    const response = await dynamoDB.send(new GetCommand({
      TableName : tableName,
      Key: {
        id: req.params.id
      }
    }));
    if(response.Item){
      res
       .status(StatusCodes.OK)
       .send(response.Item);
    }
    else{
      res
       .status(StatusCodes.NOT_FOUND)
       .send();
    }
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(error);
  }
});

router.post('/', jsonParser, async (req, res) => {
  try {
    console.log(req.body);
    const response = await dynamoDB.send(new PutCommand({
      TableName : tableName,
      Item: req.body
      }
    ));
      res
        .status(StatusCodes.CREATED)
        .send(response);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const response = await dynamoDB.send(new DeleteCommand({
      TableName : tableName,
      Key: {
        id: req.params.id
      }
    }));
    res
     .status(StatusCodes.OK)
     .send(response);
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(error);
  }
});

router.put('/:id', jsonParser, async (req,res) => {
  try {
    console.log(req.body);
    const response = await dynamoDB.send(new PutCommand({
      TableName : tableName,
      Item: req.body
      }
    ));
      res
        .status(StatusCodes.CREATED)
        .send(response);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
});

module.exports = router