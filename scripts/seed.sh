#!/bin/bash

# drop database
echo ""
echo '\x1b[31;1mInitially Dropping Testing Database\x1b[0m'

mongo testing --eval "db.dropDatabase()"

# seed database
echo ""
echo '\x1b[31;1mSeeding Test Database\x1b[0m'

mongorestore  --collection Users --db testing test/dbDump/testing/Users.bson
mongorestore  --collection someorg --db testing test/dbDump/testing/someorg.bson
