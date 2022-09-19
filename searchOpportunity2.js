import { LightningElement, track, wire } from 'lwc';
import getOpp from '@salesforce/apex/SearchOpportunity.getOpp';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
//const coloumns=[{label:'Opportunity Name'},{label:'Account Name'},{label:'Stage'},{label:'Type'},{label:'Amount'}];

export default class SearchOpportunity2 extends NavigationMixin(LightningElement) {
    @track totalRecords;
    searchValue;
    @track recordId;
    currentPage=1;
    recordSize=5;
    totalPages=0;
    visibleOpportunities;
    //coloumns=coloumns;
    getSearchValue(event){
        this.searchValue=event.target.value;
    }
    searchHandler(){
        if(this.searchValue !=''){
            getOpp({oppName:this.searchValue})
            .then(result=>{this.totalRecords=result})
            .catch(error => 
                {const event = new ShowToastEvent({title: 'Error',variant: 'error', message: error.body.message});
                this.dispatchEvent(event);
                this.totalRecords = null;
                });
        }
        else{
            const event = new ShowToastEvent({variant: 'error',message: 'Enter a name to search'});
            this.dispatchEvent(event);
        }
        this.totalPages=Math.ceil(data.length/this.recordSize);
        this.updateRecords();
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
        this.visibleRecords=JSON.stringify(this.totalRecords.slice(starting,ending));
        alert(this.visibleRecords);
    }
    navigHandler(event){
        this.recordId=event.target.value;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            },
         })
    }
}