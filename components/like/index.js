// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like:{
            type:Boolean,
            value:false
        },
        count:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgLike:'./images/like.png',
        imgUnlike:'./images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(){
            let like=!this.properties.like;
            let count=this.properties.count;
            this.setData({
                like:like,
                count:like?count+1:count-1
            });
            let behavior=like?'like':'cancel';
            this.triggerEvent('like',{
                behavior:behavior
            },{});
        }
    }
})
