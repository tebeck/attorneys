# ATTORNEYS

## backend
# register:
	 - email.
	 - firm_name.
	 - firm.
	 - password.
	 - contact_info.
	 - routing_number.
	 - account_number.
	 - phone.
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
	# list all attorneys
		# get attorney profile data
	# list all seekers
		# get seeker profiled data
	# list all appearances
		# 
# appearances
	# Model:
	# create
	# update
	# delete
	# read
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
# tests
	# create 1000 appearences
	# create user
	# delete 1000 appearences

## frontend