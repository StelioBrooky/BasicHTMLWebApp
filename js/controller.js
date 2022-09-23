window.addEventListener("load",init);
function init(){
    
    clearAll();
    loadId();
    showTotal();
    bindEvents();  
}

function clearAll(){
    /* this function clears the contents of the form except the ID (since ID is auto generated)*/
    document.querySelector('#name').value = "";
    document.querySelector('#price').value = "";
    document.querySelector('#desc').value = "";
    document.querySelector('#url').value = "";
}

let auto = autoGen();

function loadId(){
    /* this function automatically sets the value of ID */
    document.querySelector('#id').innerText = auto.next().value;
}

function showTotal(){
    /* this function populates the values of #total, #mark and #unmark ids of the form */
    let total = itemOperations.items.length;
    document.querySelector('#total').innerText = total;
    document.querySelector('#mark').innerText = itemOperations.countTotalMarked();
    document.querySelector('#unmark').innerText = total - itemOperations.countTotalMarked();
}

function bindEvents(){
    document.querySelector('#remove').addEventListener('click',deleteRecords);
    document.querySelector('#add').addEventListener('click',addRecord);
    document.querySelector('#update').addEventListener('click',updateRecord)
    document.querySelector('#save').addEventListener('click',saveRecord)
    document.querySelector('#load').addEventListener('click',loadRecord)
    document.querySelector('#exchange').addEventListener('change',getExchangerate)
}

function deleteRecords(){
    /* this function deletes the selected record from itemOperations and prints the table using the function printTable*/
    // let item;
    // for(let i = 0; i < itemOperations.items.length; i++){
    //     if(itemOperations.items[i].isMarked){
    //         item = itemOperations.items[i];
    //     }
    // }
    itemOperations.remove();
    printTable(itemOperations.items);
}




function addRecord(){
    /* this function adds a new record in itemOperations and then calls printRecord(). showTotal(), loadId() and clearAll()*/
    //printRecord();
    let id = document.querySelector('#id').textContent;
    let name = document.querySelector('#name').value;
    let price = document.querySelector('#price').value;
    let desc = document.querySelector('#desc').value;
    let color = document.querySelector('#color').value;
    let url = document.querySelector('#url').value;

    const item = new Item(id,name,price,desc,color,url);
    itemOperations.add(item);

    //console.log(item);
    printRecord(item);
    showTotal();
    loadId();
    clearAll();
}

let oldid;

function edit(){
    /*this function fills (calls fillFields()) the form with the values of the item to edit after searching it in items */ 
    oldid = document.querySelector('#id').textContent;

    let id = this.getAttribute('data-itemid');
    fillFields(itemOperations.search(id))
    
    //document.querySelector('#id').textContent = oldid;
}
function fillFields(itemObject){
    /*this function fills the form with the details of itemObject*/
    document.querySelector('#id').textContent = itemObject.id;
    document.querySelector('#name').value = itemObject.name;
    document.querySelector('#price').value = itemObject.price;
    document.querySelector('#desc').value = itemObject.desc;
    document.querySelector('#color').value = itemObject.color;
    document.querySelector('#url').value = itemObject.url;
}

function createIcon(className,fn, id){
 /* this function creates icons for edit and trash for each record in the table*/
    // <i class="fas fa-trash"></i>
    // <i class="fas fa-edit"></i>
    var iTag = document.createElement("i");
    iTag.className = className;
    iTag.addEventListener('click',fn);
    iTag.setAttribute("data-itemid", id) ;

    return iTag;
}

function updateRecord(){
    /*this function updates the record that is edited and then prints the table using printTable()*/
    let id = document.querySelector('#id').textContent;
    const item = itemOperations.search(id);

    item.id = document.querySelector('#id').textContent;
    item.name = document.querySelector('#name').value;
    item.price = document.querySelector('#price').value;
    item.desc = document.querySelector('#desc').value;
    item.color = document.querySelector('#color').value;
    item.url = document.querySelector('#url').value;

    printTable(itemOperations.items);
    document.querySelector('#id').textContent = oldid;
    clearAll();
}

function trash(){
    /*this function toggles the color of the row when its trash button is selected and updates the marked and unmarked fields */
    let id = this.getAttribute('data-itemid');
    itemOperations.markUnMark(id);
    showTotal();
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    console.log("I am Trash ",this.getAttribute('data-itemid'))
}

function printTable(items){
    /* this function calls printRecord for each item of items and then calls the showTotal function*/

    let numRows = document.getElementsByTagName("tr").length - 1;
    let table = document.querySelector('table');
    for(let i = 0; i < numRows; i++){
        table.deleteRow(1);
    }

    for(let i = 0; i < items.length; i++){
        printRecord(items[i]);
    }
    showTotal();
}
function printRecord(item){
    var tbody = document.querySelector('#items');
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in item){
        if(key=='isMarked'){
            continue;
        }
        let cell = tr.insertCell(index);
        cell.innerText = item[key] ;
        index++;
    }
    var lastTD = tr.insertCell(index);
    lastTD.appendChild(createIcon('fas fa-trash mr-2',trash,item.id));
    lastTD.appendChild(createIcon('fas fa-edit',edit,item.id));
}

function getExchangerate(){
    /* this function makes an AJAX call to http://apilayer.net/api/live to fetch and display the exchange rate for the currency selected*/
    var currency = document.querySelector('#exchange').value;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "bWETkpF6olRhcI0jw1zUzQgKtUr283yi");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch("https://api.apilayer.com/currency_data/change?start_date=2022-09-05&end_date=2022-09-05&currencies=" + currency, requestOptions)
    .then(response => response.text())
    .then(results => JSON.parse(results))
    .then(data => {
        if(currency == "NZD"){ document.getElementById("exrate").value = data.quotes.USDNZD.start_rate; }
        else if(currency == 'AUD'){ document.querySelector('#exrate').value = data.quotes.USDAUD.start_rate; }
        else if(currency == 'CAD'){ document.querySelector('#exrate').value = data.quotes.USDCAD.start_rate; }
        else if(currency == 'EUR'){ document.querySelector('#exrate').value = data.quotes.USDEUR.start_rate; }
        else if(currency == 'GBP'){ document.querySelector('#exrate').value = data.quotes.USDGBP.start_rate; }
    })
    .catch(error => console.log('error', error));
}

function saveRecord(){
    //console.log(table);
    localStorage.setItem('table', document.querySelector('table').innerHTML);
}

function loadRecord(){
    var saved = localStorage.getItem('table');
    if (saved) {
        document.querySelector('table').innerHTML = saved;
        loadItemRecords();
        printTable(itemOperations.items);
    }
    //console.log(document.querySelector('table'));


}

function loadItemRecords(){
    let numRows = document.getElementsByTagName("tr").length - 1;
    let table = document.querySelector('table');
    for(let i = 0; i < numRows; i++){
        addLoadedItem(table.rows[i+1]);
    }
}

function addLoadedItem(row){
    // for(let j = 0; j < 6; j++){
    //     console.log(row.cells[j].innerHTML);
    // }

    let id = row.cells[0].innerHTML;
    let name = row.cells[1].innerHTML;
    let price = row.cells[2].innerHTML;
    let desc = row.cells[3].innerHTML;
    let color = row.cells[4].innerHTML;
    let url = row.cells[5].innerHTML;

    const item = new Item(id,name,price,desc,color,url);
    itemOperations.add(item);

    //console.log(item);
    //printRecord(item);
    showTotal();
    loadId();
    clearAll();

}