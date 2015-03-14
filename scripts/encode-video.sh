


# get directory script is running from
DIR=$( cd "$( dirname "$0" )" && pwd )
. $DIR/set-local-env-vars.sh


file="$1"
thumb="$file.jpg"

cd "$PUBLIC_FILES_DIR/$UPLOAD_DIR/$VIDEO_DIR"
eval HandBrakeCLI -i $file -o "$PUBLIC_FILES_DIR/$VIDEO_DIR/$file $HANDBRAKE_OPTS
eval ffmpegthumbnailer -i $file -o $PUBLIC_FILES_DIR/$THUMB_DIR/$thumb $VIDEO_THUMBNAIL_OPTS
