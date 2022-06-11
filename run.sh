#!/bin/bash

docker build -t gtu/webhook-handler:0.0.1 .
docker run -it --rm -p 3500:3500 -v $(pwd)/logs:/usr/src/webhook-handler/logs --env-file $(pwd)/.env gtu/webhook-handler:0.0.1