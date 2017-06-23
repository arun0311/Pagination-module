import { Component,Input,Output,EventEmitter,OnInit } from '@angular/core';

import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Component({
selector: 'pagination',
templateUrl: './pagination.component.html',
styleUrls: [ './pagination.component.css' ]
})
export class PaginationComponent {

constructor( ) { }
@Input( ) totalitems: any;
@Input( ) maxsize: any;
@Output( ) pageChange: EventEmitter<Number>=new EventEmitter<Number>( );

// pager object
pager: any={};

// paged items

ngOnInit( ) {

this.setPage(1);

}

setPage(page: number) {
if(page<1||page>this.pager.totalPages) {

return;

}
this.pageChange.emit(page);

// get pager object from getPager function
this.pager=this.getPager(this.totalitems,page);
}
getPager(totalItems: number,currentPage: number=1,pageSize: number=this.maxsize) {

// calculate total pages
let totalPages=Math.ceil(totalItems/pageSize);

let startPage: number,endPage: number;
if(totalPages<=10) {

// less than 10 total pages so show all
startPage=1;
endPage=totalPages;
} else {
    
// more than 10 total pages so calculate start and end pages
if(currentPage<=6) {
startPage=1;
endPage=10;
} else if(currentPage+4>=totalPages) {
startPage=totalPages-9;
endPage=totalPages;
} else {
startPage=currentPage-5;
endPage=currentPage+4;
}
}

// calculate start and end item indexes
let startIndex=(currentPage-1)*pageSize;
let endIndex=Math.min(startIndex+pageSize-1,totalItems-1);

// create an array of pages to ng-repeat in the pager control

let pages=[ ];
for(var i=startPage;i<endPage;i++) {
pages.push(i);
}

// return object with all pager properties required by the view
return {
totalItems: totalItems,
currentPage: currentPage,
pageSize: pageSize,
totalPages: totalPages,
startPage: startPage,
endPage: endPage,
startIndex: startIndex,
endIndex: endIndex,
pages: pages
};
}
}