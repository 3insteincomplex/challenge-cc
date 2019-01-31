const AWS = require("aws-sdk"); // Load the AWS SDK.
const OWNER_ID = process.env.OWNER_ID; // Identify parameter by AWS Account ID.
const ec2 = new AWS.EC2(); // Instantiate an EC2 instance.
let securityGroupList; // Prepare a variable to store results.

exports.handler = async (event) => { // Async event that will pass a filter (Account ID).
  const params = {
    Filters: [{
      Name: 'owner-id',
      Values: OWNER_ID // Owner ID passed in order to filter Security Groups by Owner.
    }]
  };

  try {
    var parseJSONList = [];
    const data= await ec2.describeSecurityGroups(params).promise(); // Promise established.
    data["SecurityGroups"].forEach(group => { // Parse to the Security Group Name and ID.
      parseJSONList.push({"GroupName":group["GroupName"], "GroupID":group["GroupId"]});
    })
    securityGroupList = parseJSONList;
    console.log("Completed compiling list of AWS Security Groups.") // Print success message.
  }

  catch(err) { // Print error message.
    console.log("Error found :", err);
    return err;
  }
  return (securityGroupList);
};
