# Add new role: "admin" user

curl -X POST \
  http://localhost:6200/users/register \
  -H 'cache-control: no-cache' \
  -d 'name=admin&lastname=testadmin&email=aadmin@user.com&password=123456&phone=123123&role=admin'