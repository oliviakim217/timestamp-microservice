
# [Timestamp Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice)

A request to /api/[yyyy-mm-dd] will return a JSON object with a Unix timestamp of the input date in milliseconds.

A request to /api/[Unix timestamp in milliseconds] will return a JSON object with a UTC timestamp of the input date in this format: Thu, 01 Jan 1970 00:00:00 GMT.

A request to /api/[empty] will return the current time in a JSON object with a unix and a utc key.