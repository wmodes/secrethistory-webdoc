
srcDir='~secrethistory//Google Drive/Creative Projects/Secret History/Web Doc/Web Files'
srcDir='/Users/wmodes/Google Drive/Creative Projects/Secret History/Web Doc/Web Files'
destDir='/Users/wmodes/dev/secrethistory/meteor/public'
imgDir="images"
videoDir="video"
audioDir="audio"

imagemagick='/opt/local/bin/convert'
imgOpt=' -quality 50 -resize 1920x1920\> '
#ffmpeg='/opt/local/bin/ffmpeg'
#vidOpt=' -codec:v libx264 -profile:v high -preset slow -b:v 500k -maxrate 500k -bufsize 1000k -vf scale=-1:480 -threads 0 -codec:a libfdk_aac -b:a 128k '

handbrake='/usr/local/bin/HandbrakeCLI'
#vidOpt='-e x264 -q 22 -r 15 -B 64 -X 480 -O' # 480x272
vidOpt='-e x264 -q 22 -r 15 -B 64 -X 1280 -O'  # 1280X720

echo "# Copying GIFs and PNGs"
cd "$srcDir/$imgDir"
cp *.gif "$destDir/$imgDir/" 2> /dev/null
cp *.png "$destDir/$imgDir/" 2> /dev/null

echo "# Optimizing JPGs"
for file in *.jpg
do
    echo "  $file"
    #echo "$imagemagick" $file $imgOpt "$destDir/$imgDir/$file"
    "$imagemagick" $file $imgOpt "$destDir/$imgDir/$file"
done

echo "# Optimizing video files"
cd "$srcDir/$videoDir"
for file in *.mp4
do
    echo "  $file"
    #echo ffmpeg -i \"$file\" $vidOpt \"$destDir/$file\"
    #ffmpeg -i "$file" $vidOpt "$destDir/$videoDir/$file"
    #echo $handbrake -i \"$file\" -o \"$destDir/$videoDir/$file\" $vidOpt
    $handbrake -i "$file" -o "$destDir/$videoDir/$file" $vidOpt
done

echo "# Orig size:"
du -sh "$srcDir"/*/
echo "# Final size:"
du -sh "$destDir"/*/

