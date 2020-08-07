
import { KeywordModel } from '../../models/keyword.js';
import { BookModel } from '../../models/book.js';
import { paginationBev } from '../behaviors/pagination.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
    /**
     * 组件的属性列表
     */

    behaviors: [paginationBev],

    properties: {
        more: {
            type: Boolean,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false,
        noResult:false
    },

    attached() {
        this.setData({
            historyWords: keywordModel.getHistory()
        })
        keywordModel.getHot().then(res => {
            this.setData({
                hotWords: res.hot
            })
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore() {
            if (!this.data.q) {
                return;
            }
            if (this.data.loading) {
                return;
            }
            if (this.hasMore()) {
                this.setData({
                    loading: true
                });
                bookModel.search(this.getCurrentStart(), this.data.q)
                    .then(res => {
                        this.setMoreData(res.books);
                        this.setData({
                            loading: false
                        });
                    }, rej => {
                        this.setData({
                            loading: false
                        });
                    });
            }
        },
        onCancel(event) {
            this.triggerEvent('cancel', {}, {});
        },
        onConfirm(event) {
            this.setData({
                searching: true
            });
            this.setData({
                loadingCenter: true
            });
            this.initialize();
            this.setData({
                noResult:false
            });
            let q = event.detail.value || event.detail.text;
            bookModel.search(0, q)
                .then(res => {
                    if(res.books.length==0){
                        this.setData({
                            noResult:true
                        })
                    }
                    this.setMoreData(res.books);
                    this.setTotal(res.total);
                    this.setData({
                        q
                    });
                    keywordModel.addToHistory(q);
                    this.setData({
                        loadingCenter: false
                    });
                })
        },
        onDelete(event) {
            this.setData({
                searching: false,
                noResult: false,
                q:''
            })
        }
    }
})
