/**
 * Based on https://gist.github.com/chansuke/5b66aa9389b8f04aff18aa53d4020409
 */

// https://aws.amazon.com/sdk-for-node-js/
const aws = require("aws-sdk");

/**
 * OriginID is defined in the CloudFormation template. To find a Cloudfront
 * distribution, the lambda must build the OriginID from the bucket name in
 * the same way
 * @param {String} bucketName
 */
const buildOriginId = (bucketName) => `S3-origin-${bucketName}`;

/**
 * It is assumed that only changes on `index.html` are detected. Consequently,
 * @param {String} filePath
 */
const buildOriginPath = (filePath) => {
  const expectedFileName = "index.html";

  return filePath !== expectedFileName
    ? // Don't forget the leading slash
      // -1 for the last slash
      "/" + filePath.substr(0, filePath.length - expectedFileName.length - 1)
    : "";
};

/**
 * Create invalidation of all files in the CloudFront distribution
 */
const createInvalidation = (originId, originPath) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html
  const cloudfront = new aws.CloudFront({ apiVersion: "2019-03-26" });

  //   // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html#createInvalidation-property

  return new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, function (err, data) {
      if (err) {
        reject(err);
      }

      // Find the Cloudfront distribution based on origin ID and originPath
      const distribution = data.DistributionList.Items.filter((distrib) =>
        distrib.Origins.Items.some((origin) => {
          return origin.Id === originId && origin.OriginPath === originPath;
        })
      ).find(() => true);

      // Nothing found T_T
      if (!distribution) {
        reject({
          message: "No Cloudfront distribution found",
          originId,
          originPath,
        });

        return;
      }

      // Build invalidation parameters: just invalidate everything!
      const params = {
        DistributionId: distribution.Id,
        InvalidationBatch: {
          CallerReference: new Date().toISOString(),
          Paths: { Quantity: 1, Items: ["/*"] },
        },
      };

      // Create invalidation
      cloudfront.createInvalidation(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
};

exports.handler = async (event) => {
  try {
    // Extract info from records
    const bucketName = event.Records[0].s3.bucket.name;
    // file path is expected to be "some-folder/index.html"
    const filePath = event.Records[0].s3.object.key;

    const cloudFormationInvalidation = await createInvalidation(
      buildOriginId(bucketName),
      buildOriginPath(filePath)
    );

    return {
      statusCode: 200,
      body: { cloudFormationInvalidation },
    };
  } catch (err) {
    console.error("Caught error: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};
