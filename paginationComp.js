import { api, LightningElement } from 'lwc';

export default class PaginationComp extends LightningElement {
    @api visibleRecords;
    currentPage=1;
    totalRecords;
    @api recordSize=5;
    totalPages=0;
    get records(){
        return this.visibleRecords;
    }
    @api
    set records(data){
        if(data){
            this.totalRecords=data;
            this.recordSize=Number(this.recordSize);
            this.totalPages=Math.ceil(data.length/this.recordSize);
            this.updateRecords();
        }

    }
    previousHandler(){
        if(this.currentPage>1){
            this.currentPage=this.currentPage-1;
            this.updateRecords();
        }
    }
    nextHandler(){
        if(this.currentPage<this.totalPages){
            this.currentPage=this.currentPage+1;
            this.updateRecords();
        }
    }
    updateRecords(){
        const starting=(this.currentPage-1)*this.recordSize;
        const ending=this.currentPage*this.recordSize;
        this.visibleRecords=this.totalRecords.slice(starting,ending);
        this.dispatchEvent(new CustomEvent('myevent',{detail:{records:this.visibleRecords}}));

    }
}