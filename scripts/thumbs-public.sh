


# get directory script is running from
DIR=$( cd "$( dirname "$0" )" && pwd )
. $DIR/set-local-env-vars.sh


# IMAGES

cd "$PUBLIC_FILES_DIR/$UPLOAD_DIR/$IMAGE_DIR"
for file in *; do 
    thumb="$file.jpg"
    eval convert $file $IMAGE_THUMBNAIL_OPTS "$PUBLIC_FILES_DIR/$THUMB_DIR/$thumb"
done

# VIDEO

cd "$PUBLIC_FILES_DIR/$UPLOAD_DIR/$VIDEO_DIR"
for file in *.mp4; do 
    thumb="$file.jpg"
    eval ffmpegthumbnailer -i $file -o "$PUBLIC_FILES_DIR/$THUMB_DIR/$thumb" $VIDEO_THUMBNAIL_OPTS
done

