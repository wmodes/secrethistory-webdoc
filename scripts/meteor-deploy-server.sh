
STARTDIR="/Users/wmodes/dev/secrethistory/meteor"
APPNAME="secrethistory"
SERVER="doc.peoplesriverhistory.us"
PORT="80"
USER="wmodes"
DEPLOY_LOCATION="/home/secrethistory"
DEPLOY_USER="secrethistory"
ARCH="os.linux.x86_64"

exclude_public () {
    if [ ! -d $STARTDIR/.public-stub ]; then
        mkdir -p $STARTDIR/.public-stub/images
        mkdir -p $STARTDIR/.public-stub/video
        mkdir -p $STARTDIR/.public-stub/audio
        touch $STARTDIR/.public-stub/STUB
    fi
    if [ -f $STARTDIR/public/REAL ]; then
        echo "moving public out of the way"
        rm -rf $STARTDIR/.public
        mv $STARTDIR/public $STARTDIR/.public
        cp -R $STARTDIR/.public-stub $STARTDIR/public
    fi
}

restore_public () {
    if [ -f $STARTDIR/.public/REAL ]; then
        echo "restoring public"
        rm -rf $STARTDIR/public
        mv $STARTDIR/.public $STARTDIR/public
    fi
}

exclude_public
trap restore_public INT TERM EXIT

cd $STARTDIR

scp ../scripts/* $USER@$SERVER:~/scripts/


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
sudo cp -pr ~$USER/scripts/* $DEPLOY_LOCATION/scripts/
sudo mv ~$USER/meteor.tar.gz $DEPLOY_LOCATION/
cd $DEPLOY_LOCATION/
# we are not deleting the existing bundle lest we nix the existing upload files
#sudo rm -rf bundle
sudo tar xvfz meteor.tar.gz
cd bundle/programs/server/
sudo npm install
sudo chown -R $DEPLOY_USER.$DEPLOY_USER $DEPLOY_LOCATION
sudo nginx -s reload
sudo restart secrethistory
sudo start secrethistory
EOT

rm ../$APPNAME/meteor.tar.gz

restore_public
