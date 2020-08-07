
import {HTTP} from '../utils/http-p.js';

class KeywordModel extends HTTP{
    key='q';
    maxLength=10;
    getHistory(){
        return wx.getStorageSync(this.key);
    }

    getHot(){
        return this.request({
            url:'book/hot_keyword'
        })
    }

    addToHistory(keyword){
        let words=this.getHistory() || [];
        let has=words.includes(keyword);
        if(!has){
            let length=words.length;
            if(length>=this.maxLength){
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words);
        }
    }
}

export {KeywordModel}