# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
### Unit Tests
I have written 5 tests, which exhaustively covers, all the cases in the deterministicPartitionKey function
1. Returns the literal '0' when given no input 
2. Returns the partitionKey if partitionKey is given in input object
3. Returns new key with input data with sha3-512, if partitionKey field is not present in input
4. partitionKey returned is of Type string
    - partitionKey in event object is kept as integer and then checked if returned type is of string
    - all other cases uses crypto to get key, which returns string. So no need to check other cases
5. partitionKey in given input is > MAX_PARTITION_KEY_LENGTH = 256 then returns new key with sha3-512 hash
    I have taken two cases for this
    - When partitionKey length in event object is of 256 length
    - When partitionKey length in event object is of 257 length

### Refactoring changes made
1. used lodash to get the partition key and assign it to candidate. 
    This handles the case when event is undefined or event has no partitionKey field in a single statement
    ```
    let candidate = _.get(event, 'partitionKey');
    ```


2. if candidate is still undefined and there is data in event create new key with event data and assign it candidate
    ``` 
    if (!candidate && event) {
        const data = JSON.stringify(event);
        candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
    ```

3. Instead of if else on candidate simply do an OR (||) operation. which ensures if candidate is still undefined assign it to TRIVIAL_PARTITION_KEY
    ```
    candidate = candidate || TRIVIAL_PARTITION_KEY;
    ```

4. check type of candidate and convert it to string if needed
    ```
    if (typeof candidate !== 'string') {
        candidate = JSON.stringify(candidate);
    }
    ```