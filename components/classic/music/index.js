
import {classicBeh} from '../classic-beh';

const mMgr=wx.getBackgroundAudioManager();

Component({
    
    behaviors:[classicBeh],
    
    properties: {
        src:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        pauseSrc:'./images/player@pause.png',
        playSrc:'./images/player@play.png',
        playing: false
    },

    attached(event){
        this._recoverStatus();
        this._monitorSwitch();
    },

    methods: {
        onPlay(event){
            if(!this.data.playing){
                this.setData({
                    playing:true
                })
                mMgr.title = this.properties.src;
                mMgr.src=this.properties.src;
            }else{
                this.setData({
                    playing:false
                });
                mMgr.pause();
            }
        },
        _recoverStatus(){
            if(mMgr.paused){
                this.setData({
                    playing:false
                })
                return
            }
            if(mMgr.src==this.properties.src){
                this.setData({
                    playing:true
                })
            }
        },
        _monitorSwitch(){
            mMgr.onPlay(()=>{
                this._recoverStatus();
            });
            mMgr.onPause(()=>{
                this._recoverStatus();
            });
            mMgr.onStop(()=>{
                this._recoverStatus();
            });
            mMgr.onEnded(()=>{
                this._recoverStatus();
            });
        }
    }
})
