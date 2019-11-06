//Object creation constructor
function Book(bookId, title, authorName) {
    this.bookId = bookId;
    this.title = title;
    this.authorName = authorName;
}

var books = [
    new Book(1, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling"),
    new Book(2, "Harry Potter and the Chamber of Secrets", "J.K. Rowling"),
    new Book(3, "The Hobbit", "J. R. R. Tolkien"),
    new Book(4, "1984", "George Orwell"),
    new Book(5, "Pride and Prejudice", "Jane Austen"),
    new Book(6, "To Kill a Mockingbird", "Harper Lee"),
    new Book(7, "The Da Vinci Code", "Dan Brown"),
    new Book(8, "The Catcher in the Rye", "J. D. Salinger"),
    new Book(9, "The Great Gatsby", "F. Scott Fitzgerald"),
    new Book(10, "Twilight", "Stephenie Meyer"),
    new Book(11, "The Hunger Games", "Suzanne Collins"),
    new Book(12, "Jane Eyre", "Charlotte Brontë"),
    new Book(13, "Animal Farm", "George Orwell"),
    new Book(14, "The Kite Runner", "Khaled Hosseini"),
    new Book(15, "Brave New World", "Aldous Huxley"),
    new Book(16, "The Lord of the Rings", "J. R. R. Tolkien"),
    new Book(17, "The Fellowship of the Ring", "J. R. R. Tolkien"),
    new Book(18, "Wuthering Heights", "Emily Brontë"),
    new Book(19, "New Moon", "Stephenie Meyer"),
    new Book(20, "The Odyssey", "Homer")
];

var pageState = {
    "dataSet" : books,
    "page" : 1,
    "rows" : 6
}

buildTable(); //build table for each page

//trim table based on page number
function pagination(dataSet, page, rows) {
    var start = (page - 1) * rows;
    var end = start + rows;

    //trim the data based on the number of rows and the page you are on
    var pageTrim = dataSet.slice(start, end);

    //How many pages you will need based on the number of records
    var noOfPages = Math.ceil(dataSet.length / rows);

    return {
        "dataSet" : pageTrim,
        "noOfPages" : noOfPages
    }
}

//Create the buttons based on the number of pages
function pageNav(noOfPages) {
    var pagesNav = document.getElementById("pageNav");
    var page;
    var button = "";

    button += `<button value = "prev" onclick = "previous()">&laquo</button>\n`

    for(page = 1; page <= noOfPages; page++) {
        button += `<button value = "${page}" onclick = "getPage(${page})">${page}</button>\n`
    }

    button += `<button value = "next" onclick = "next(${noOfPages})">&raquo</button>`

    pagesNav.innerHTML = button;
}

//Function to get each page when you click page numbers
function getPage(value) {
    table = document.getElementById("table"); 

    for(i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }

    pageState.page = value;

    buildTable();
}

//Function to go to the previous page
function previous(){
    if(pageState.page != 1){
        table = document.getElementById("table"); 

        for(i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i);
        }

        pageState.page -= 1;
        buildTable();
    }
}

//Function to go to the next page
function next(noOfPages){
    if(pageState.page != noOfPages) {
        table = document.getElementById("table"); 

        for(i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i);
        }

        pageState.page += 1;
        buildTable();
    }
}

function buildTable() {
    var table = document.getElementById("tblBody");
    var i, j;

    //store returned pagination object
    var booksTrim = pagination(pageState.dataSet, pageState.page, pageState.rows);
    var bookList = booksTrim.dataSet; //get dataset from pagination object

    //Populate the table
    for(i = 0; i < bookList.length; i++) {
        var book = bookList[i];
        var row = document.createElement("tr");//create a row element
        var properties = ["bookId", "title", "authorName"];

        for(j = 0; j < properties.length; j++) {
            var dataCell = document.createElement("td");

            dataCell.innerHTML = book[properties[j]];

            row.appendChild(dataCell);
        }

        table.appendChild(row);
    }

    pageNav(booksTrim.noOfPages);
}