
# get directory script is running from
DIR=$( cd "$( dirname "$0" )" && pwd )
. $DIR/set-local-env-vars.sh


cd $PUBLIC_FILES_DIR/$UPLOAD_DIR/$IMAGE_DIR

cp *.gif "$PUBLIC_FILES_DIR/$IMAGE_DIR/" 2> /dev/null
cp *.png  "$PUBLIC_FILES_DIR/$IMAGE_DIR/" 2> /dev/null

for file in *.jpg; do 
    eval convert $file $IMAGEMAGICK_OPTS "$PUBLIC_FILES_DIR/$IMAGE_DIR/$file" 
done
