const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null
    },
    methods: {
        setMoreData(dataArray) {
            let tempArray = this.data.dataArray.concat(dataArray);
            this.setData({
                dataArray: tempArray
            })
        },
        getCurrentStart() {
            return this.data.dataArray.length;
        },
        setTotal(total) {
            this.data.total = total;
        },
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false;
            } else {
                return true;
            }
        },
        initialize(){
            this.setData({
                dataArray:[]
            })
            this.data.total=null;
        }
    },
})

export {paginationBev}