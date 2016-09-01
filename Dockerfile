FROM docker.with.me/ubuntu-node:6
MAINTAINER Mario Tacke

# setup local filesystem
ADD . /root/app
WORKDIR /root/app

CMD ./build-and-deploy.sh
