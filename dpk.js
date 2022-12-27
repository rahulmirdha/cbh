const crypto = require("crypto");
const _ = require('lodash');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  // get the partition key and assign it to candidate
  let candidate = _.get(event, 'partitionKey');

  // if candidate is still undefined and there is data in event
  // create new key with event data and assign it candidate
  if (!candidate && event) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  // if candidate is still undefined assign it to TRIVIAL_PARTITION_KEY
  candidate = candidate || TRIVIAL_PARTITION_KEY;

  // check type of candidate and convert it to string if needed
  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  // if length of candidate > MAX_PARTITION_KEY_LENGTH
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};