
STARTDIR="/Users/wmodes/dev/secrethistory/meteor"
APPNAME="secrethistory"
SERVER="doc.peoplesriverhistory.us"
PORT="80"
USER="wmodes"
DEPLOY_LOCATION="/home/secrethistory"
DEPLOY_USER="secrethistory"
ARCH="os.linux.x86_64"

cd $STARTDIR

scp ../scripts/* $USER@$SERVER:~/scripts/

#mv public .public
meteor build ../$APPNAME --server $SERVER:$PORT --architecture $ARCH
if [ "$?" != 0 ]; then 
    echo "Error: Meteor build failed."
    #mv .public public
    exit 1
fi

scp ../$APPNAME/meteor.tar.gz $USER@$SERVER:~
if [ "$?" != 0 ]; then 
    echo "Error: Copy failed."
    #mv .public public
    exit 1
fi

ssh $USER@$SERVER <<EOT
sudo cp -pr ~$USER/scripts/* $DEPLOY_LOCATION/scripts/
sudo mv ~$USER/meteor.tar.gz $DEPLOY_LOCATION/
cd $DEPLOY_LOCATION/
sudo rm -rf bundle
sudo tar xvfz meteor.tar.gz
cd bundle/programs/server/
sudo npm install
sudo chown -R $DEPLOY_USER.$DEPLOY_USER $DEPLOY_LOCATION
sudo nginx -s reload
sudo start secrethistory
EOT

rm ../$APPNAME/meteor.tar.gz

#mv .public public

