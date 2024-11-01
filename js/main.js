window.onload = loaded;

/**
 * Simple Function that will be run when the browser is finished loading.
 */

var xhrResponse = [];
function loaded() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        xhrResponse = JSON.parse(xhr.response);
        populateTable(xhrResponse);
    });
    xhr.open("GET", "https://va4kva7kjc.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
    
   for(i=0; i < xhrResponse.length; i++){
    document.getElementById('tableBody').innerHTML += `<tr><td>Test</td></tr>`;
   }
}

document.getElementById('load-data').onclick = function() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        xhrResponse = JSON.parse(xhr.response);
        console.log(xhrResponse);
        populateTable(xhrResponse);
    });
    xhr.open("GET", "https://va4kva7kjc.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

function populateTable(tableData){
    document.getElementById('tableBody').innerHTML = '';
    for(i=0; i < tableData.length; i++){
        document.getElementById('tableBody').innerHTML += 
        `<tr>
            <td>` + tableData[i].id + `</td>
            <td>` + tableData[i].name + `</td>
            <td>` + tableData[i].price + `</td>
            <td><button onClick=deleteById(` + tableData[i].id + `)>Delete</button></td>
        </tr>`;
    }
}

function deleteById(itemId){
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://va4kva7kjc.execute-api.us-east-2.amazonaws.com/items/" + itemId);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

var form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://va4kva7kjc.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "id": formData.get('id'),
        "price": formData.get('price'),
        "name": formData.get('name'),
    }));
    
})

