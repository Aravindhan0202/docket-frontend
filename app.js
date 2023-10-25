function populateSuppliers() {
    fetch('https://docket-backend.onrender.com/getSuppliers') 
      .then(response => response.json())
      .then(data => {
        const supplierDropdown = document.getElementById('supplier');
        data.forEach(supplier => {
          const option = document.createElement('option');
          option.value = supplier;
          option.textContent = supplier;
          supplierDropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  }
  

populateSuppliers();

// Function to populate the purchase order dropdown based on the selected supplier
function populatePurchaseOrders(selectedSupplier) {
    fetch(`https://docket-backend.onrender.com/getPONumber?supplier=${selectedSupplier}`) 
      .then(response => response.json())
      .then(data => {
        const PONumberDropdown = document.getElementById('purchaseOrder');
        data.forEach(purchaseOrder => {
        let formattedOption = purchaseOrder.poNumber+' - '+purchaseOrder.description;
          const option = document.createElement('option');
          option.value = formattedOption;
          option.textContent = formattedOption;
          PONumberDropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
}


function handleSubmit(e) {
    console.log("Handle Submit Called");
    e.preventDefault();
    let payload = {
        "name": e.srcElement.name.value,
        "startTime":e.srcElement.startTime.value,
        "endTime": e.srcElement.endTime.value,
        "hoursWorked": e.srcElement.hoursWorked.value,
        "ratePerHour": e.srcElement.ratePerHour.value,
        "supplier": e.srcElement.supplier.value,
        "purchaseOrder": e.srcElement.purchaseOrder.value
    }

    fetch(`https://docket-backend.onrender.com/saveDocket`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
    hidePopup();
    window.location.reload();
    return false;
}

function showPopup() {
    var formDiv = document.getElementById('formDiv');
    formDiv.className = 'visibleDiv';
    console.log(formDiv.className);
}

function hidePopup() {
    var formDiv = document.getElementById('formDiv');
    formDiv.className = 'hiddenDiv';
}

function getDockets() {
    var docketTable = document.getElementById("docketListTable");
    fetch(`https://docket-backend.onrender.com/getDockets`) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach(docket => {
            var tableRow = document.createElement("tr");    
            for(key in docket){
                if(key == "id"){
                    continue;
                }
                var tableData = document.createElement("td");
                tableData.innerText = docket[key];
                tableRow.appendChild(tableData);
            }
            docketTable.appendChild(tableRow);
        })
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
    console.log(docketTable);
}
getDockets();

