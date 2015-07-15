#£¡/bin/bash/
id=$1
email=$2
commit_messege=$3

key_file=/var/www/.ssh/id_rsa_$id
username=$(echo $email | sed "s/\(\)@.*/\1/")

cd /edx/var/edxapp/staticfiles/ucore/$id/ucore_lab

ssh-add $key_file
git remote add origin$id git@$id:$username/ucore.git
git add .
git commit -m $commit_messege
git push -u origin$id master