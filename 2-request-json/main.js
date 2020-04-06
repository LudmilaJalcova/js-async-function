document.getElementById('button1').addEventListener('click', loadCustomer);
document.getElementById('button2').addEventListener('click', loadCustomers);

function loadCustomer() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'customer.json', true);

  xhr.onload = function() {
    if (this.status === 200) {
      const customer = JSON.parse(this.responseText);

      const output = `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `;

      document.getElementById('customer').innerHTML = output;
    }
  };

  xhr.send();
}

function loadCustomers() {
  // domaca urobit to iste ale pre vsetky data t.j.
  // pride ti pole cize ho namapujes pomocou forEach scitaj vsetky ul s datami ako hore a vloz to do customers divka

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'customers.json', true);

  xhr.onload = function() {
    //JSON.parse() premeni text na objekt
    JSON.parse(this.responseText).forEach(customer => {
      if (this.status === 200) {
        const output = `
            <ul>
              <li>ID: ${customer.id}</li>
              <li>Name: ${customer.name}</li>
              <li>Company: ${customer.company}</li>
              <li>Phone: ${customer.phone}</li>
            </ul>
          `;

        document.getElementById('customers').innerHTML += output;
      }
    });
  };

  xhr.send();
}
