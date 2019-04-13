#/bin/bash

server="50.sail"

set -e

npm run build
rsync -rz --checksum ./dist/ $server:/var/www/gpu-board/
