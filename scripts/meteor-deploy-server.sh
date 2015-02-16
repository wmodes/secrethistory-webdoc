
APPNAME="secrethistory"
SERVER="doc.peoplesriverhistory.us"
PORT="80"
USER="wmodes"
DEPLOY_LOCATION="/home/secrethistory/"
DEPLOY_USER="secrethistory"
ARCH="os.linux.x86_64"

cd ..
meteor build $APPNAME --server $SERVER:$PORT --architecture $ARCH
if [ "$?" != 0 ]; then 
    echo "Error: Meteor build failed."
    exit 1
fi

scp $APPNAME.tar.gz $USER@$SERVER:~
if [ "$?" != 0 ]; then 
    echo "Error: Copy failed."
    exit 1
fi

ssh $USER@$SERVER <<EOT
sudo mv ~$USER/$APPNAME.tar.gz $DEPLOY_LOCATION
cd $DEPLOY_LOCATION
sudo tar xvfz $APPNAME.tar.gz
chown -R $DEPLOY_USER.$DEPLOY_USER .
sudo nginx -s reload
EOT
if [ "$?" != 0 ]; then 
    echo "Error: Deploy and restart"
    echo "Did you enable the console from the Gandi instance control panel?"
    exit 1
fi

rm $APPNAME.tar.gz
