#!/bin/bash

WORK_DIR=/srv/2024-CEDC
TMP_DIR=${WORK_DIR}/_tmp/backend
BUILD_DIR=${WORK_DIR}/build/backend
GIT_URI=https://github.com/J93es/2024-creative-engineering-design-competition.git

cd      ${WORK_DIR}                                                                 &&
sudo    rm -rf  ${WORK_DIR}/_tmp                                                    &&
sudo    git     clone ${GIT_URI} _tmp                                                  &&
sudo    rm -rf  ${BUILD_DIR}/*                                                      &&
sudo    cp -r   ${TMP_DIR}/*    ${BUILD_DIR}                                        &&
sudo    cp      ${WORK_DIR}/env/backend ${BUILD_DIR}/.env                           &&
cd      ${BUILD_DIR}                                                                &&
sudo    npm     install                                                             &&
sudo    npm     run build                                                           &&
sudo    pm2     stop 2024-CEDC-backend                                              ;
sudo    pm2     delete 2024-CEDC-backend                                            ;
sudo    pm2     start ecosystem.config.js                                           &&
sudo    pm2     save                                                                &&
sudo    pm2     startup                                                             &&
sudo    rm -rf  ${WORK_DIR}/_tmp                                                    &&
sudo    systemctl restart nginx