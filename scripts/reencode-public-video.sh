

# get directory script is running from
DIR=$( cd "$( dirname "$0" )" && pwd )
. $DIR/set-local-env-vars.sh


cd $PUBLIC_FILES_DIR/$UPLOAD_DIR/$VIDEO_DIR
for file in *.mp4; do 
	eval HandBrakeCLI -i $file -o ../../video/$file $HANDBRAKE_OPTS
    thumb="$file.jpg"
    eval ffmpegthumbnailer -i $file -o "$PUBLIC_FILES_DIR/$THUMB_DIR/$thumb" $VIDEO_THUMBNAIL_OPTS
done
