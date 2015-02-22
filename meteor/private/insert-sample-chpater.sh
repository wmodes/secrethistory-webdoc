SAMPLEDATAFILE="/Users/wmodes/dev/secrethistory/meteor/private/chapter-voyage-life.json"
COLLECTION="ChapterCollection"

(
echo "db.$COLLECTION.insert("
cat $SAMPLEDATAFILE
echo ")"
echo
) | meteor mongo 
