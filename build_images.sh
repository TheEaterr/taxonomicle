#!/bin/sh

cd back && CGO_ENABLED=0 go build && cd ..
docker build back -t taxonomicle/back
docker build front -t taxonomicle/front