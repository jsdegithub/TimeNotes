import { ClassicModel } from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

    data: {
        classic: '',
        latest:true,
        first:false
    },

    onLoad: function (options) {
        classicModel.getLatest(res => {
            this.setData({
                classic: res
            })
        })
    },

    onLike: function (event) {
        let behavior = event.detail.behavior;
        likeModel.like(behavior, this.data.classic.id,
            this.data.classic.type);
    },
    
    _updateClassic(nextOrPrevious){
        let index=this.data.classic.index;
        classicModel.getClassic(index, nextOrPrevious, res=>{
            this.setData({
                classic:res,
                latest:classicModel.isLatest(res.index),
                first:classicModel.isFirst(res.index)
            })
        })
    },

    onNext(event){
        this._updateClassic('next');
    },

    onPrevious(event){
        this._updateClassic('previous');
    },

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
})