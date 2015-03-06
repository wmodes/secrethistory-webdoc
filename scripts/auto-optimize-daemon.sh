#!/bin/bash

debug=1

imageDir="images";
videoDir="video";
audioDir="audio";
uploadDir=".upload";

if [[ "`hostname`" =~ secrethistory|peoplesriverhistory ]]; then
    # we are deployed
    publicBase="/home/secrethistory/bundle/programs/web.browser/app";
    imagemagick="/usr/bin/convert"
    handbrake="/usr/bin/HandBrakeCLI"
else
    # we are on localhost
    publicBase="/Users/wmodes/dev/secrethistory/meteor/public";
    imagemagick="/opt/local/bin/convert"
    handbrake="/usr/local/bin/HandbrakeCLI"
fi

srcDir="$publicBase/$uploadDir"
destDir="$publicBase"

mkdir $srcDir 2> /dev/null
mkdir $srcDir/$imageDir 2> /dev/null
mkdir $srcDir/$videoDir 2> /dev/null
mkdir $srcDir/$audioDir 2> /dev/null

mkdir $destDir/$imageDir 2> /dev/null
mkdir $destDir/$videoDir 2> /dev/null
mkdir $destDir/$audioDir 2> /dev/null

while true; do

    # test if there are files in the src dir. If not, bounce
    if ! ls $srcDir/*/* > /dev/null 2>&1; then
        sleep 5
        continue
    fi

    imageMagickOpts=' -quality 50 -resize 1920x1920\> '
    handbrakeOpts='-e x264 -q 22 -r 15 -B 64 -X 1280 -O'  # 1280X720

    if [ $debug == 1 ]; then
        echo "# Copying GIFs and PNGs"
    fi
    cd "$srcDir/$imageDir"
    files=`ls *.gif *.png 2> /dev/null`
    for file in $files
    do
        mv $file "$destDir/$imageDir/" 2> /dev/null
    done

    if [ $debug == 1 ]; then
        echo "# Optimizing JPGs"
    fi
    cd "$srcDir/$imageDir"
    files=`ls *.jpg 2> /dev/null`
    for file in $files
    do
        if [ $debug == 1 ]; then
            echo "  $file"
            echo \"$imagemagick\" $file $imageMagickOpts \"$destDir/$imageDir/$file\"
        fi
        "$imagemagick" "$file" $imageMagickOpts "$destDir/$imageDir/$file" > /dev/null 2>&1
        if [ $? != 0 ]; then
            echo "ERROR: image optimization failed"
        else
            rm "$file"
        fi
    done

    if [ $debug == 1 ]; then
        echo "# Optimizing video files"
    fi
    cd "$srcDir/$videoDir"
    files=`ls *.mp4 2> /dev/null`
    for file in $files
    do
        if [ $debug == 1 ]; then
            echo "  $file"
            echo $handbrake -i \"$file\" -o \"$destDir/$videoDir/$file\" $vidOpt
        fi
        "$handbrake" -i "$file" -o "$destDir/$videoDir/$file" $handbrakeOpts > /dev/null 2>&1
        if [ $? != 0 ]; then
            echo "ERROR: video optimization failed"
        else
            rm "$file"
        fi
    done

    if [ $debug == 1 ]; then
        echo "# Copying audio"
    fi
    cd "$srcDir/$audioDir"
    files=`ls *.mp3 *.wav 2> /dev/null`
    for file in $files
    do
        mv $file "$destDir/$audioDir/" 2> /dev/null
    done

    if [ $debug == 1 ]; then
        echo "# Orig size:"
        du -sh "$srcDir"/*/
        echo "# Final size:"
        du -sh "$destDir"/*/
    fi

    sleep 2

done
