
APPNAME="secrethistory"
SERVER="test.peoplesriverhistory.us"
PORT="80"
FTPUSER="152191"
FTPSERVER="sftp.dc1.gpaas.net"
FTPLOCATION="/vhosts/default/"

SSHUSER="152191"
SSHSERVER="console.dc1.gpaas.net"
SSHLOCATION="web/vhosts/default/"
ARCH="os.linux.x86_64"
AVAIL_NODE="0.10.36"

rm -rf ../$APPNAME.demeteorized/
demeteorizer --app_name $APPNAME --output ../$APPNAME.demeteorized/
if [ "$?" != 0 ]; then 
    echo "Error: Meteor build/demeteorizer failed."
    exit 1
fi
cd ../$APPNAME.demeteorized
perl -pi -e "s/\"node\": \"0\.10\..*\"/\"node\": \"$AVAIL_NODE\"/g" package.json
tar cvfz ../$APPNAME.tar.gz .
if [ "$?" != 0 ]; then 
    echo "Error: Tarball failed"
    exit 1
fi

cd ..
sftp $FTPUSER@$FTPSERVER <<EOT
put $APPNAME.tar.gz $FTPLOCATION
bye
EOT
if [ "$?" != 0 ]; then 
    echo "Error: SFTP failed."
    exit 1
fi
rm $APPNAME.tar.gz

/bin/echo -n "Enable the console from the Gandi instance control panel: "; read; echo


ssh $SSHUSER@$SSHSERVER <<EOT


cd $SSHLOCATION
tar xvfz $APPNAME.tar.gz
EOT
if [ "$?" != 0 ]; then 
    echo "Error: Deploy and restart"
echo <<EOT
Unfortunately, due to Gandi's wacky console I won't be able to run 
remotely.  However, you can login from here:

https://www.gandi.net/admin/hosting/paas/89243

1. Activate the SSH Console with the link on the page.
2. Use the Login link which should open up an SSH window.
3. Login using your console password.
4. Execute the following commands in the shell:

cd $SSHLOCATION
tar xvfz $APPNAME.tar.gz

EOT
    exit 1
fi

