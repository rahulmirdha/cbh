const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey if partitionKey is given in input object", () => {
    const event = {partitionKey: 'abc'};
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe('abc');
  });

  it("Returns new key with input data with sha3-512, if partitionKey field is not present in input", () => {
    const event = "testNokeyField4567878";
    const expectedKey = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  })

  test("partitionKey returned is of Type string", () => {
    const event = {partitionKey: 1234};
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe('1234');
  });

  test("partitionKey in given input is > MAX_PARTITION_KEY_LENGTH then returns new key with sha3-512 hash", () => {
    let key = 'a';
    // make key of 256 length
    for(let i = 0; i < 8; i++) key += key;
    const event = {partitionKey: key};
    const partitionKeyOne = deterministicPartitionKey(event);
    expect(partitionKeyOne).toBe(key);

    // for > 256 length
    key += 'a'
    event.partitionKey = key;
    const expectedKey = crypto.createHash("sha3-512").update(key).digest("hex");
    const partitionKeyTwo = deterministicPartitionKey(event);
    expect(partitionKeyTwo).toBe(expectedKey);
  });

});
