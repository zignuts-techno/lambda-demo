# Lambda Demo with DynamoDB and API Gateway

This is a demo project that manages the image uploads. This uses DynamoDB and Lambda for storing the images data and getting the images data. 


## Project Setup

This project relies on the [Serverless Framework](https://www.serverless.com/). We will first install the serverless and its dependencies as per the steps below. 

### Setup on local

- Make sure the Node.js is installed
- npm i -g serverless
- Clone this repo and cd into the project dir
- npm i
- For testing the applications locally, run `sls offline`

### Deployment

- Make sure the AWS CLI is installed and respective profile has been configured.
- This deployment assumes the default profile to be used for the deployment. 
- Make sure the IAM user that is configured in the AWS CLI has the necessary permissions to deploy the lambda functions
- From the local machine, run `sls deploy` to deploy the project. 
- The serverless framework will create necessary things specified in the serverless.yml file

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://yc8w5zownd.execute-api.ap-south-1.amazonaws.com/dev/<route>
```