#!/bin/bash

WORK_DIR=/srv/2024-CEDC
TMP_DIR=${WORK_DIR}/_tmp/frontend
BUILD_DIR=${WORK_DIR}/build/frontend
GIT_URI=https://github.com/J93es/2024-creative-engineering-design-competition.git

cd      ${WORK_DIR}                                                         &&
sudo    rm -rf          ${WORK_DIR}/_tmp                                    &&
sudo    git clone       ${GIT_URI} _tmp                                     &&
sudo    rm -rf          ${BUILD_DIR}/*                                      &&
sudo    cp -r           ${TMP_DIR}/*                ${BUILD_DIR}            &&
sudo    cp              ${WORK_DIR}/env/frontend    ${BUILD_DIR}/.env       &&
cd      ${BUILD_DIR}                                                        &&
sudo    npm install                                                         &&
sudo    npm run build                                                       && 
sudo    rm -rf          ${WORK_DIR}/_tmp                                    &&
sudo    systemctl restart nginx