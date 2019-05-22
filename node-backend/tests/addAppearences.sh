#!/bin/bash
# Make sure to add a valid token

accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M4OTA5YjJiM2UyMmU4YmIxODJhY2UiLCJpYXQiOjE1NTY2NTE1MjIsImV4cCI6MTU2NjY1MTUyMn0.H9q-XKPhgvb9sb4XQvPim0jnQIOORvzSDZvYI3VwOUs'

c=1
while [ $c -le 1000 ]
do

curl -X POST \
  http://localhost:6200/appearances/create \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -H 'x-access-token: '$accessToken'' \
  -d '{
		"courtHouse": "example"'$c',
		"areaOfLaw": "asd",
		"goal": "asd",
		"contextInformation":"asd",
		"clientPresent":true,
		"lateCall":true,
		"additionalComments": "test"
		}'

((c++))

done
