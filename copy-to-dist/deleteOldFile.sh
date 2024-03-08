#!/bin/bash
HOME="/home/faker/astp/run/html"

#判断是否存在该目录
if [ -d ${HOME} ]
then
    #进入目录
    cd ${HOME}
    #
    echo "删除前"
    #输出文件大小
    du -h --max-depth=0 ./*
    #删除3天前的目录
    find ./* -type d -mtime +3 | xargs -r rm -r
    #
    echo "删除后"
    #
    du -h --max-depth=0 ./*
    else
    echo "文件夹不存在"
fi

