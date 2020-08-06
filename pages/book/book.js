
import {
    BookModel
} from '../../models/book.js';

let bookModel = new BookModel();


Page({

    data:{
        books:[]
    },

    onLoad: function(options) {
        bookModel.getHotList()
        .then(res => {
            this.setData({
                books:res
            })
        })
    }
})
