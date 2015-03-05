
STARTDIR="/Users/wmodes/dev/secrethistory/meteor/"
APPNAME="secrethistory"
SERVER="doc.peoplesriverhistory.us"
PORT="80"
USER="wmodes"
DEPLOY_LOCATION="/home/secrethistory/"
DEPLOY_USER="secrethistory"
ARCH="os.linux.x86_64"

cd $STARTDIR
meteor build ../$APPNAME --server $SERVER:$PORT --architecture $ARCH
if [ "$?" != 0 ]; then 
    echo "Error: Meteor build failed."
    exit 1
fi

scp ../$APPNAME/meteor.tar.gz $USER@$SERVER:~
if [ "$?" != 0 ]; then 
    echo "Error: Copy failed."
    exit 1
fi

ssh $USER@$SERVER <<EOT
sudo mv ~$USER/meteor.tar.gz $DEPLOY_LOCATION
cd $DEPLOY_LOCATION
sudo rm -rf bundle
sudo tar xvfz meteor.tar.gz
cd cd bundle/programs/server/
sudo npm install
sudo chown -R $DEPLOY_USER.$DEPLOY_USER .
sudo nginx -s reload
sudo restart secrethistory
EOT
if [ "$?" != 0 ]; then 
    echo "Error: Deploy and restart"
    echo "Did you enable the console from the Gandi instance control panel?"
    exit 1
fi

rm ../$APPNAME/meteor.tar.gz
