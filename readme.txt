The following describes how to use this API.

Note on data:
Throughout the application domain, username is used. This refers to the email field
in the data service.

Authentication
Before querying any of the data endpoints, a user must be authenticated.
This is done by querying the login endpoint with the username in the request body.
If the user exists, a JWT token will be returned in the response body.
All subsequent requests must have this token in the Authorization header in the form,
Authorization: Bearer [token].

Authorization
Endpoint authorization is based on the role of the user sending the request.
The user's role is extracted from the JWT token in the request.

Endpoints

/login
Returns a JWT token for all subsequent requests.
Verifies the user exists.

Request JSON body:
{
	"username": "[username]"
}

Test Data:
User with role USER: barnettblankenship@quotezart.com
User with role ADMIN: britneyblankenship@quotezart.com

/users/[id]
Returns the user with the requested id.
Must have the Authorization header with a JWT token for a user with the role USER or ADMIN.

Test Data: a0ece5db-cd14-4f21-812f-966633e7be86

/users/[username]
Returns the user with the requested username.
Must have the Authorization header with a JWT token for a user with the role USER or ADMIN.

Test Data: barnettblankenship@quotezart.com

/policies?username=[username]
Returns a list of policies.
If the query parameter username is not present, an error is returned.
This is done as a /policies endpoint was not requested and using a query param is
REST best practice for filtering a list of resources.
Must have the Authorization header with a JWT token for a user with the role ADMIN.

Test Data: inesblankenship@quotezart.com

/users/policies/[id]
Returns the user associated with the requested policy id.
Must have the Authorization header with a JWT token for a user with the role ADMIN.

Test Data: 64cceef9-3a01-49ae-a23b-3761b604800b
