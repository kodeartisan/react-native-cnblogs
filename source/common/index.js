
import React, {
    NetInfo
} from 'react-native';

import _ from 'lodash';
import Config from '../config';
import entities from 'entities';

const imageSourcePath = Config.assetDomain + "/public/img/metarial/";
const bloggerAvatarPath = "https://pic.cnblogs.com/face/";
const questionAvatarPath = "http://pic.cnblogs.com/avatar/";

export function getBloggerName(authorUri) {
    authorUri = _.trimEnd(authorUri, '\/');
    return authorUri.slice(authorUri.lastIndexOf("\/") + 1);
}

export function getBloggerAvatar(avatarUri){
    if (avatarUri != bloggerAvatarPath) {
        return avatarUri;
    }
    return Config.appInfo.avatar;
}

export function getQuestionAuthorAvatar(avatarName){
    if(avatarName && avatarName !== "sample_face.gif"){
        return questionAvatarPath + avatarName;
    }
    return Config.appInfo.avatar;
}

export function getBloggerHdpiAvatar(avatarUri){
    if (avatarUri && !_.endsWith(avatarUri, ".gif")) {
        avatarUri = avatarUri.replace(/face/, 'avatar');
        avatarUri = avatarUri.replace(/avatar\/u/, 'avatar\/a');
        return avatarUri;
    }
    return Config.appInfo.avatar;
}

export function filterCodeSnippet(codeText) {
    if (codeText && codeText.length) {
        codeText = _.trim(codeText);
        codeText = _.trim(codeText, '&#xD;');
        if (codeText.startsWith(' ') || codeText.endsWith(' ') || codeText.startsWith('&#xD;') || codeText.endsWith('&#xD;')) {
            codeText = filterCodeSnippet(codeText);
        }
    }
    return codeText;
}

export function filterCommentData(commentText) {
    if (commentText && commentText.length) {
        commentText = commentText.replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
        commentText = "<comment>" + commentText + "</comment>";
    }
    return commentText;
}

export function decodeHTML(htmlStr) {
    if (htmlStr && htmlStr.length) {
        htmlStr = entities.decodeHTML(htmlStr);
    }
    return htmlStr;
}

export function getImageSource(key){
    let imageLen = 20;
    if (!key) {
        key = _.random(1, imageLen - 1);
    }
    return imageSourcePath + key + ".jpg?v=1.1";
}

export function splitStrToArray(str, char = ',', count = 3){
    return _.split(str, char, count);
}
