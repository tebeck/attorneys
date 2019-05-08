# ATTORNEYS

## backend
# 1. REGISTER: ( ATTORNEY OF RECORD && ATTORNEY OF APPEARENCE(seeker) && ADMIN USER ) -> SET true or false below.
	curl -X POST \
	  http://localhost:6200/users/register \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
 -d '{
        "isSeeker": true,
        "isAttorney": true,
        "firstName": "exampleName",
        "lastName": "exampleLastName",
        "lawFirm": "exampleLawFirm",
        "stateBar": 111111111,
        "officePhone": "exampleOfficePhone",
        "mobilePhone": "exampleMobilePhone",
        "email": "test@example.com",
        "mailingAddress": { "streetAdd1": "exampleAddress" },
        "password": "examplePassword",
        "profilePicture": "examplePicture",
        "creditCard": 111111111,
        "policy": 111111111,
        "notification": { "sms": true},
        "insurancePolicy": 111111111,
        "termsConditions": true,
        "rating": 111111111,
        "reviewTotal": 0,
        "reviews": { "comment": "String" }
}'

# 2. VERIFICATION EMAIL
### a. Copy the recieved TOKEN on the response
### b. Paste this in your browser-> http://localhost:6200/confirmation/PASTE-TOKEN-HERE

# 3. AUTHENTICATE
	curl -X POST \
	  http://localhost:6200/users/authenticate \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: a56ad3a9-a099-4ee3-9546-679523a76793' \
	  -H 'cache-control: no-cache' \
	  -d '{
	    "email": "youremail@gmail.com",
	    "password": "yourpassword"
	}'

# 4. MAKE ADMIN USER ( ONLY ADMINS )
### a. Get the user id to make admin and past it on code below.
	curl -X POST \
	  http://localhost:6200/admin/create \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: bc3865bb-0cfb-4c6d-8b88-252937e5f1ea' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs' \
	  -d '{
		"id": "5cd2f38d9f6c576c8cb5a1d6"
	}'




### LOGS:
	# validate errors
	# already exists email validation
# authenticate: 
	# valid email and password jwt bcrypt
	# validate errors
	# validate user not found
	# validate incorrect user or password
# admin create
	# super user creation
	# validate errors
	# validate already admin
	# only admin authorized to make another admin
	# check jwt token is valid.
# admin routes
	# list all attorneys (fixed)
		# get attorney profile data
	# list all seekers (Fixed)
		# get seeker profiled data
	# list all appearances (Fixed)
		# 
# appearances
	# Model:
	# create
	# update
	# delete
	# read (fixed. get appearences by userId seeker)
	 # Validations:
	 	- seekers only can crud appearences
	 	- attorneys only can postulate appearences
		- 1 attorned_id asociated to 1 postulation_id (appearence).
		- 1 attorney many different postulations (appearence).
# postulations
	# create
	# delete
# seekers
	# create profile with email, name, contact info, phone, routing number, account number, password.
	# create appearence oportunity. NOT COMPLETE YET.
	# see all appearences oportunities sorted by date descendent without pagination.
# attorney
	# list of accepted appearences
	# 
# tests
	# create 1000 appearences
	# create user
	# delete 1000 appearences


# tokens:
## ace: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs

## cec8: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2QwMzhlNWUzNjMyZWQ3N2YxMmNlYzgiLCJpYXQiOjE1NTcxNDk5MzYsImV4cCI6MTU2NzE0OTkzNn0.nEhBEgVclpUi_eEHYAiNul1SnQmFXn5JEM9NpOomSI8

## frontend