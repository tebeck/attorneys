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
	  -d '{"password": "a","email": "a",
        "isSeeker": true,
        "isAttorney": true,
        "firstName": "testName",
        "lastName": "testLN",
        "lawFirm": "exampleLawFirm",
        "stateBar": 111111111,
        "officePhone": "exampleOfficePhone",
        "mobilePhone": "exampleMobilePhone",
        "mailingAddress": { "streetAdd1": "exampleAddress" },
        "profilePicture": "examplePicture",
        "creditCard": 111111111,
        "policy": 111111111,
        "notification": { "sms": true},
        "insurancePolicy": 111111111,
        "termsConditions": true,
        "rating": 111111111,
        "reviewTotal": 0,
        "reviews": {"seekerId": "test", "appearanceId": "test","postulationId":"test","rating":0, "comment": "test" } }'

# VERIFICATION EMAIL
### a. Copy the recieved VERIFY-TOKEN on the response
### b. Paste this in your browser-> http://localhost:6200/confirmation/PASTE-TOKEN-HERE

# AUTHENTICATE
	curl -X POST \
	  http://localhost:6200/users/authenticate \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -d '{
	    "email": "a",
	    "password": "a"
	}'

# GET PROFILE ( INSERT USER TOKEN )
	curl -X GET \
	  http://localhost:6200/users/profile \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U1NGEyM2U1ZTQxYTQ3ZDE5N2M5OWIiLCJpYXQiOjE1NTg1MzA2MzIsImV4cCI6MTU5MDA2NjYzMn0.UQzBQwDhFopEyfFiZJET659pIJYIEWVM58RBczWom7E'

# LOST PASSWORD





#--------------------------------------------------------------------------
# APPEARENCES ( ATTORNEY OF RECORD )
#--------------------------------------------------------------------------

### The token inside the "x-access-token" will define the creator on the appearance created.

# CREATE NEW APPEARENCE
	curl -X POST \
	  http://localhost:6200/appearances/create \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U1NGEyM2U1ZTQxYTQ3ZDE5N2M5OWIiLCJpYXQiOjE1NTg1MzA2MzIsImV4cCI6MTU5MDA2NjYzMn0.UQzBQwDhFopEyfFiZJET659pIJYIEWVM58RBczWom7E' \
	  -d '{
		"courtHouse": "example",
		"areaOfLaw": "asd",
		"goal": "asd",
		"contextInformation":"asd",
		"clientPresent":true,
		"lateCall":true,
		"additionalComments": "test"
		}'
	
	* SENDMAIL OK

# EDIT/UPDATE MY APPEARENCE (Need: x-access-token, fields to update (see model), id (appearanceId))
	curl -X POST \
	  http://localhost:6200/appearances/update \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs' \
	  -d 'title=newAppearanceUpdated&id=5cd5d52f0b34a34361f7fb0a'

# CANCEL MY APPEARENCE (Need: x-acces-token, id(appearanceId))
	curl -X POST \
	  http://localhost:6200/appearances/delete \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs' \
	  -d id=5cd5d52f0b34a34361f7fb0a

# ACCEPT POSTULATION (x-access-token (attorney), postulationId)
	curl -X POST \
	  http://localhost:6200/postulations/accept \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: 31385d16-2513-4e18-b623-680c3e56ebb7' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U1NGEyM2U1ZTQxYTQ3ZDE5N2M5OWIiLCJpYXQiOjE1NTg1MzA2MzIsImV4cCI6MTU5MDA2NjYzMn0.UQzBQwDhFopEyfFiZJET659pIJYIEWVM58RBczWom7E' \
	  -d '{
		"postulationId":"5ce54be2db0a2857e89acac1"
	}'

# REJECT POSTULATION (x-access-token (attorney), postulationId)
	curl -X POST \
	  http://localhost:6200/postulations/reject \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: 31385d16-2513-4e18-b623-680c3e56ebb7' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U1NGEyM2U1ZTQxYTQ3ZDE5N2M5OWIiLCJpYXQiOjE1NTg1MzA2MzIsImV4cCI6MTU5MDA2NjYzMn0.UQzBQwDhFopEyfFiZJET659pIJYIEWVM58RBczWom7E' \
	  -d '{
		"postulationId":"5ce54be2db0a2857e89acac1"
	}'

	curl -X POST \
	  http://localhost:6200/postulations/reject \
	  -H 'Postman-Token: d41b8376-e17b-4e23-9a55-d0064f7a38eb' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjgwM2QyMjdiODBmZjMzYTk1MWIiLCJpYXQiOjE1NTc3NzIzMTQsImV4cCI6MTAwMDAwMTU1Nzc3MjMxNH0.H4mCSvafXOod-6i-ujFnDWFgthXqjUxd1gzdswt-EF0' \
	  -d 'postulationId=5cdadf7486027847cbaf5ab9&status=accepted'

	* SEND MAIL TO ATTORNEY OF RECORD AND SEEKER ¡OK!

# RAITING

#--------------------------------------------------------------------------
# APPEARENCES ( SEEKER )
#--------------------------------------------------------------------------

# GET APPEARANCES
	curl -X GET \
	  http://localhost:6200/appearances \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U1NGEyM2U1ZTQxYTQ3ZDE5N2M5OWIiLCJpYXQiOjE1NTg1MzA2MzIsImV4cCI6MTU5MDA2NjYzMn0.UQzBQwDhFopEyfFiZJET659pIJYIEWVM58RBczWom7E'

# POSTULATE TO APPEARANCE (CREATE METHOD) (x-access-token = seeker || attorney+seeker, appearanceId => frontend)
	curl -X POST \
	  http://localhost:6200/postulations/create \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U1NGEyM2U1ZTQxYTQ3ZDE5N2M5OWIiLCJpYXQiOjE1NTg1MzA2MzIsImV4cCI6MTU5MDA2NjYzMn0.UQzBQwDhFopEyfFiZJET659pIJYIEWVM58RBczWom7E' \
	  -d appearanceId=5ce5a65aeda17f756d641bc6

# CANCEL APPEARANCE DEFAULT: 24HS BEFORE createdAt (x-access-token = seeker who applied, postulationId)
	curl -X POST \
	  http://localhost:6200/postulations/cancel \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjgwM2QyMjdiODBmZjMzYTk1MWIiLCJpYXQiOjE1NTc3NzIzMTQsImV4cCI6MTAwMDAwMTU1Nzc3MjMxNH0.H4mCSvafXOod-6i-ujFnDWFgthXqjUxd1gzdswt-EF0' \
	  -d postulationId=5cd9c028d40027469266bf39


# AGENDA ( get all my postulations accepted by order desc )
	curl -X GET \
	  http://localhost:6200/postulations/agenda \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: b1f7d6e0-358f-4543-889b-d0401fcb61aa' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RkYTY5NjUyNjY4ZjE1ZWE2ZDU0MmQiLCJpYXQiOjE1NTgwMjk5OTMsImV4cCI6MTU4OTU2NTk5M30.IJOuFd_9aWjjpUDIFIZTg3-4juddO5KjZphdt1Bfap4' \

# UPLOAD IMG/PDF PROOF AND UPDATE STATE TO COMPLETED

# CHANGE STATUS COMPLETED
	curl -X POST \
	  http://localhost:6200/postulations/completed \
	  -H 'Content-Type: application/json' \
	  -H 'Postman-Token: 3c407c6c-2348-43eb-b7bc-9c2c815dc93f' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RlZmNlNjY4MTgyMTFlNGZlYTk3MTIiLCJpYXQiOjE1NTgxMTc2MzMsImV4cCI6MTU4OTY1MzYzM30.zHkvLSzGEYBXyuEqBa7h4s73j_SNTQGoSAu52EQ7AaY' \
	  -d '{
		"postulationId": "5cdefd2b6818211e4fea9718"
	}'

# RAITING





##------------------------
# TEST USERS:

aa (attorney + seeker)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RlZTlkMWM3ZGI4NmZlNWQwOTFiZjIiLCJpYXQiOjE1NTgxMTI3NDYsImV4cCI6MTU4OTY0ODc0Nn0.C16oCg6jtUyy8H1XSLlotPzafj3X7LjpHFeJeh711wA


a (attorney)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RlZWExMWM3ZGI4NmZlNWQwOTFiZjciLCJpYXQiOjE1NTgxMTI4MDQsImV4cCI6MTU4OTY0ODgwNH0.19GGULD0z2MKp6a1ItC22neASvxPWeE6as_WFtj9akY

b (seeker)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RlZWE0N2M3ZGI4NmZlNWQwOTFiZmMiLCJpYXQiOjE1NTgxMTI4NTYsImV4cCI6MTU4OTY0ODg1Nn0.c9_HOxmNpEu6LB7xPHmyRA-nAwZ1690JmBR0fCpD9sQ


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
	        "password": "admin"
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

# ENABLE ONHOLD SEEKER
	curl -X POST \
	  http://localhost:6200/admins/enable \
	  -H 'Content-Type: application/json' \
	  -H 'cache-control: no-cache' \
	  -d '{"email": "thombeckford@gmail.com"}'

# DISABLE USER
	curl -X POST \
	  http://localhost:6200/admins/disableuser \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q0MzYxZjM5NmFjYjRjYjg0ZTAyNmEiLCJpYXQiOjE1NTc0MTEzOTksImV4cCI6MjU1NzQxMTM5OX0.E_1l1ndzlnVIUJ3_Ue_rJZo5MYBjoIhPlASfb2gzi_A' \
	  -d id=5cc8909b2b3e22e8bb182ace

# LIST ALL USERS
	curl -X POST \
	  http://localhost:6200/admins/getusers \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q0MzYxZjM5NmFjYjRjYjg0ZTAyNmEiLCJpYXQiOjE1NTc0MTEzOTksImV4cCI6MjU1NzQxMTM5OX0.E_1l1ndzlnVIUJ3_Ue_rJZo5MYBjoIhPlASfb2gzi_A' 

# DELETE USER (require: x-access-token: ADMIN, id of user)
	curl -X POST \
	  http://localhost:6200/admins/deleteuser \
	  -H 'Postman-Token: c405fd6e-247d-46d4-ac2d-9c8954b8a5e7' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YjgwM2QyMjdiODBmZjMzYTk1MWIiLCJpYXQiOjE1NTc3NzIzMTQsImV4cCI6MTAwMDAwMTU1Nzc3MjMxNH0.H4mCSvafXOod-6i-ujFnDWFgthXqjUxd1gzdswt-EF0' \
	  -d id=5cd9bedad40027469266bf33

# LIST APPEARANCES
	curl -X GET \
	  http://localhost:6200/admins/appearances \
	  -H 'Postman-Token: f8df9716-8494-401d-974a-68b56ff4c38d' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YmQzMmYxYjdjNjQzODMyOGVhZmYiLCJpYXQiOjE1NTc3NzM3MTMsImV4cCI6MTAwMDAwMDAxNTU3NzczNzEwfQ.qiJfBelzVjy4CBB7VbisCPgySI6NHQJGcqDaPoRtYfk'

# LIST ATTORNEYS
	curl -X GET \
	  http://localhost:6200/admins/attorneys \
	  -H 'Postman-Token: 72ed2f7c-ecfd-4939-a884-2f900b3eaff5' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YmQzMmYxYjdjNjQzODMyOGVhZmYiLCJpYXQiOjE1NTc3NzM3MTMsImV4cCI6MTAwMDAwMDAxNTU3NzczNzEwfQ.qiJfBelzVjy4CBB7VbisCPgySI6NHQJGcqDaPoRtYfk'

# LIST SEEKERS
	curl -X GET \
	  http://localhost:6200/admins/seekers \
	  -H 'Postman-Token: 3efa3502-8ee5-443c-a586-a91afbcc55da' \
	  -H 'cache-control: no-cache' \
	  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5YmQzMmYxYjdjNjQzODMyOGVhZmYiLCJpYXQiOjE1NTc3NzM3MTMsImV4cCI6MTAwMDAwMDAxNTU3NzczNzEwfQ.qiJfBelzVjy4CBB7VbisCPgySI6NHQJGcqDaPoRtYfk'

# CHANGE ROLES

# SORT AND FILTER USERS BY TYPE	

# ADD USER

# EDIT USER

# CRUD APPEARANCES


# FRONTEND


#### Are you attorney of record ?
#### FALSE -> Sign up appearing attorney
#### END
#### TRUE -> Sign up
#### Are you appearing attorney ?
#### TRUE -> Get common fields from form before.
#### FALSE -> END
#### Sign up
