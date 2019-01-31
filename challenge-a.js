const AWS = require("aws-sdk"); // Load the AWS SDK
const OWNER_ID = ["794381291637"];
const ec2 = new AWS.EC2();
let securityGroupList;

exports.handler = async (event) => {
  const params = {
    Filters: [{
      Name: 'owner-id',
      Values: OWNER_ID
    }]
  };

  try {
    var parseJSONList = [];
    const data= await ec2.describeSecurityGroups(params).promise();
    data["SecurityGroups"].forEach(group => {
      parseJSONList.push({"GroupName":group["GroupName"], "GroupID":group["GroupId"]});
    })
    securityGroupList = parseJSONList;
    console.log("Completed compiling list of AWS Security Groups.")
  }

  catch(err) {
    console.log("Error found :", err);
    return err;
  }
  return (securityGroupList);
};
