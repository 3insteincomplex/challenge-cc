const AWS = require("aws-sdk"); // Load the AWS SDK
const OWNER_ID = [process.env.OWNER_ID]; // Load Env Var for OwnerID
const ec2 = new AWS.EC2(); // Instatiate EC2

exports.handler = async (event) => { // Async handler for AWS SDK
  const params = {
    Filters: [{
      Name: 'owner-id',
      Values: OWNER_ID
    }]
  };

  const response = { // Establish Response form
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };

  try { // try-catch block to catch errors.
    var parseJSONList = [];
    response.statusCode = 200; // Establish Response Success status code.
    const data= await ec2.describeSecurityGroups(params).promise();
    data["SecurityGroups"].forEach(group => {
      parseJSONList.push(group);
    }) // Format security group data.
    response.body = JSON.stringify(parseJSONList, null,2);
    console.log("Completed compiling list of AWS Security Groups.")
  }

  catch(err) { // Catch errors
    response.statusCode = 500; // Establish Response Error status code.
    console.log("Error found :", err);
    response.body = JSON.stringify({
      message: `Could not load Security Group data: ${err}`
    });
  }
  return response; // Handler outputs response.
};