## NODEJS-MONGOOSE-JWT-CRYPT-BCRYPT-EMAIL


##### ATTORNEY OF RECORD = ATTORNEY
##### ATTORNEY OF APPEARANCE = SEEKER

####--------------------------------------------------------------------------
#### NORMAL USERS SECTION
####--------------------------------------------------------------------------

# REGISTER: 
###( ATTORNEY OF RECORD && ATTORNEY OF APPEARANCE ) -> SET true or false below.

	curl -X POST \
	  http://localhost:6200/users/register \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -d '{
        "isSeeker": false,
        "isAttorney": true,
        "firstName": "testName",
        "lastName": "testLN",
        "lawFirm": "exampleLawFirm",
        "stateBar": 111111111,
        "officePhone": "exampleOfficePhone",
        "mobilePhone": "exampleMobilePhone",
        "email": "attorney@gmail.com",
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
        "reviews": { "comment": "String" } }'

# VERIFICATION EMAIL
### a. Copy the recieved VERIFY-TOKEN on the response
### b. Paste this in your browser-> http://localhost:6200/confirmation/PASTE-TOKEN-HERE

# AUTHENTICATE
	curl -X POST \
	  http://localhost:6200/users/authenticate \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: a56ad3a9-a099-4ee3-9546-679523a76793' \
	  -H 'cache-control: no-cache' \
	  -d '{
	    "email": "attorney@gmail.com",
	    "password": "examplePassword"
	}'

# GET PROFILE ( INSERT USER TOKEN )
	curl -X GET \
	  http://localhost:6200/users/profile \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs'

#--------------------------------------------------------------------------
# ADMINS CMS SECTION
#--------------------------------------------------------------------------

# REGISTER
	curl -X POST \
	  http://localhost:6200/admins/register \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -d '{
	        "email": "admin@gmail.com",
	        "password": "test"
	}'

# AUTHENTICATE 
	curl -X POST \
	  http://localhost:6200/admins/authenticate \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -d '{
	        "email": "admin@gmail.com",
	        "password": "test"
	}'

# DISABLE USER
	curl -X POST \
	  http://localhost:6200/admins/disableuser \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q0MzYxZjM5NmFjYjRjYjg0ZTAyNmEiLCJpYXQiOjE1NTc0MTEzOTksImV4cCI6MjU1NzQxMTM5OX0.E_1l1ndzlnVIUJ3_Ue_rJZo5MYBjoIhPlASfb2gzi_A' \
	  -d id=5cc8909b2b3e22e8bb182ace

# GET ALL USERS
	curl -X POST \
	  http://localhost:6200/admins/getusers \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q0MzYxZjM5NmFjYjRjYjg0ZTAyNmEiLCJpYXQiOjE1NTc0MTEzOTksImV4cCI6MjU1NzQxMTM5OX0.E_1l1ndzlnVIUJ3_Ue_rJZo5MYBjoIhPlASfb2gzi_A' 

# ADD USER

# EDIT USER

# SORT AND FILTER USERS BY TYPE

#--------------------------------------------------------------------------
# APPEARENCES ( BEING ATTORNEY OF RECORD )
#--------------------------------------------------------------------------

### The token inside the "x-access-token" will define the creator on the appearance created.

# CREATE NEW APPEARENCE
	curl -X POST \
	  http://localhost:6200/appearances/create \
	  -H 'Postman-Token: fdbb3c5e-28b7-4b5f-b464-879d9c233ff5' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjBkNTAyZTllYmQxMGI2OGJjMTUiLCJpYXQiOjE1NTc3NzQwMTcsImV4cCI6MTAwMDAwMTU1Nzc3NDAxN30.YYM7tdzE9kIga2aM-2zQJp0FzaDr34A3CM4LApGOZcQ' \
	  -d title=NewPost

# EDIT/UPDATE MY APPEARENCE (Need: x-access-token, fields to update (see model), id (appearanceId))

	curl -X POST \
	  http://localhost:6200/appearances/update \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs' \
	  -d 'title=newAppearanceUpdated&id=5cd5d52f0b34a34361f7fb0a'

# DELETE MY APPEARENCE (Need: x-acces-token, id(appearanceId))

	curl -X POST \
	  http://localhost:6200/appearances/delete \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs' \
	  -d id=5cd5d52f0b34a34361f7fb0a

# APPROVE OR REJECT POSTULATION (x-access-token (attorney), status = "confirmed, rejected", postulationId)
	curl -X POST \
	  http://localhost:6200/postulations/approve \
	  -H 'Postman-Token: d41b8376-e17b-4e23-9a55-d0064f7a38eb' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjBkNTAyZTllYmQxMGI2OGJjMTUiLCJpYXQiOjE1NTc3NzQwMTcsImV4cCI6MTAwMDAwMTU1Nzc3NDAxN30.YYM7tdzE9kIga2aM-2zQJp0FzaDr34A3CM4LApGOZcQ' \
	  -d 'postulationId=5cd9c028d40027469266bf39&status=confirmed'

#--------------------------------------------------------------------------
# APPEARENCES ( BEING ATTORNEY OF APPEARANCE = SEEKER )
#--------------------------------------------------------------------------

# POSTULATE TO APPEARANCE (CREATE METHOD) (x-access-token = seeker || attorney+seeker, appearanceId => frontend)
	curl -X POST \
	  http://localhost:6200/postulations/create \
	  -H 'Postman-Token: 174b3f9f-0848-41f6-a4ee-6125598ecf25' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YmQzMmYxYjdjNjQzODMyOGVhZmYiLCJpYXQiOjE1NTc3NzM3MTMsImV4cCI6MTAwMDAwMDAxNTU3NzczNzEwfQ.qiJfBelzVjy4CBB7VbisCPgySI6NHQJGcqDaPoRtYfk' \
	  -d appearenceId=5ccc51b30a2ae91a3470cb8a

# 

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
# tests
	# create 1000 appearences
	# create user
	# delete 1000 appearences
# sendmail
	# create service
	# create credentials
# env file
	# configuration
# attorney of record
	# profile
	# list appearences
# update sendmail service



# Attorney of record -> post new appearance.
# Attorney of appearance -> postulate to new appearance.


##------------------------
# TEST USERS:

### ADMIN:

email: admin@gmail.com
pass: test
id: 5cd9bd32f1b7c6438328eaff
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YmQzMmYxYjdjNjQzODMyOGVhZmYiLCJpYXQiOjE1NTc3NzM3MTMsImV4cCI6MTAwMDAwMDAxNTU3NzczNzEwfQ.qiJfBelzVjy4CBB7VbisCPgySI6NHQJGcqDaPoRtYfk

### ATTORNEY:

email: attorney@gmail.com
pass: examplePassword
id: 5cd9b0d502e9ebd10b68bc15

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjBkNTAyZTllYmQxMGI2OGJjMTUiLCJpYXQiOjE1NTc3NzkwNTMsImV4cCI6MTU1Nzg3OTA1M30.6pnvA2unE5FR6HIz7ZHotgSitYivKVZWteLCcUnkZyw

### SEEKER:
email: seeker@gmail.com
pass: examplePassword
id: 5cd9b0be02e9ebd10b68bc10

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjBiZTAyZTllYmQxMGI2OGJjMTAiLCJpYXQiOjE1NTc3NzM4MzMsImV4cCI6MTAwMDAwMTU1Nzc3MzgzM30.lW4HE_ly_sJo9FEB0FQGCGgz8Q2dp2D-OqwyGiDVnoA

### ATTORNEY + SEEKER:
email: attseeker@gmail.com
pass: examplePassword
id: 5cd9b803d227b80ff33a951b
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjgwM2QyMjdiODBmZjMzYTk1MWIiLCJpYXQiOjE1NTc3NzIzMTQsImV4cCI6MTAwMDAwMTU1Nzc3MjMxNH0.H4mCSvafXOod-6i-ujFnDWFgthXqjUxd1gzdswt-EF0





# FRONTEND


#### Are you attorney of record ?
#### FALSE -> Sign up appearing attorney
#### END
#### TRUE -> Sign up
#### Are you appearing attorney ?
#### TRUE -> Get common fields from form before.
#### FALSE -> END
#### Sign up
