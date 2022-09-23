const itemOperations = {
    items:[],
    add(itemObject){
        /* adds an item into the array items*/
        this.items.push(itemObject);
    },
    remove(){
        /* removes the item which has the "isMarked" field set to true*/
        //this.items.filter(e => !e.isMarked);
        let x = -1;
        for (let i = 0; i < this.items.length; i++){
            if(this.items[i].isMarked){
                x = i;
                break;
            }
        }
        
        if (x >= 0) this.items.splice(x,1);
    },
    search(id){
        /* searches the item with a given argument id */
        for (let i = 0; i < this.items.length; i++){
            if (this.items[i].id == id) { return this.items[i]; }
        }
    },
    markUnMark(id){
        /* toggle the isMarked field of the item with the given argument id*/
        for (let i = 0; i < this.items.length; i++){
            if (this.items[i].id == id) { 
                this.items[i].toggle();
                return;
            }
        }
    },
    countTotalMarked(){
        /* counts the total number of marked items */
        let count = 0;
        for (let i = 0; i < this.items.length; i++){
            if (this.items[i].isMarked) { count++; }
        }
        return count;
    },
   
}