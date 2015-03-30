
STARTDIR="/Users/wmodes/dev/secrethistory/meteor"
APPNAME="secrethistory"
SERVER="doc.peoplesriverhistory.us"
PORT="80"
USER="wmodes"
DEPLOY_LOCATION="/home/secrethistory"
DEPLOY_USER="secrethistory"
ARCH="os.linux.x86_64"

ssh $USER@$SERVER <<EOT
sudo cp -pr ~$USER/scripts/* $DEPLOY_LOCATION/scripts/
sudo mv ~$USER/meteor.tar.gz $DEPLOY_LOCATION/
cd $DEPLOY_LOCATION/
echo > secrethistory.log
# we are not deleting the existing bundle lest we nix the existing upload files
#sudo rm -rf bundle
sudo tar xvfz meteor.tar.gz
cd bundle/programs/server/
sudo npm install
sudo rm -R ./npm/npm-bcrypt/node_modules/bcrypt
sudo npm install bcrypt
sudo chown -R $DEPLOY_USER.$DEPLOY_USER $DEPLOY_LOCATION
sudo nginx -s reload
sudo restart secrethistory
sudo start secrethistory
EOT
