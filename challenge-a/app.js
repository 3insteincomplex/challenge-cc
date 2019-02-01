const AWS = require("aws-sdk"); // Load the AWS SDK
const OWNER_ID = [process.env.OWNER_ID];
const ec2 = new AWS.EC2();

exports.handler = async (event) => {
  const params = {
    Filters: [{
      Name: 'owner-id',
      Values: OWNER_ID
    }]
  };

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };

  try {
    var parseJSONList = [];
    response.statusCode = 200;
    const data= await ec2.describeSecurityGroups(params).promise();
    data["SecurityGroups"].forEach(group => {
      parseJSONList.push({"GroupName":group["GroupName"], "GroupID":group["GroupId"]});
    })
    response.body = JSON.stringify(parseJSONList);
    console.log("Completed compiling list of AWS Security Groups.")
  }

  catch(err) {
    response.statusCode = 500;
    console.log("Error found :", err);
    response.body = JSON.stringify({
      message: `Could not load Security Group data: ${err}`
    });
  }
  return response;
};