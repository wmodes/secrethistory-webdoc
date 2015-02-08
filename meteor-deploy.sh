
APPNAME="secrethistory"
SERVER="doc.peoplesriverhistory.us"
PORT="80"
USER="wmodes"
DEPLOY_LOCATION="/home/secrethistory/"
DEPLOY_USER="secrethistory"
ARCH="os.linux.x86_64"

cd ..
meteor build $APPNAME --server $SERVER:$PORT --architecture $ARCH
if [ $? ]; then 
    echo "Error: Meteor build failed."
    exit 1
fi

scp $APPNAME.tar.gz $USER@$SERVER:~
if [ $? ]; then 
    echo "Error: Copy failed."
    exit 1
fi

ssh $USER@$SERVER <<EOT
sudo mv ~$USER/$APPNAME.tar.gz $DEPOY_LOCATION
cd $DEPLOY_LOCATION
sudo tar xvfz $APPNAME.tar.gz
sudo nginx -s reload
EOT
if [ $? ]; then 
    echo "Error: Deploy and restart"
    exit 1
fi

rm $APPNAME.tar.gz
