function easyHTTP() {
  this.http = new XMLHttpRequest();
}

easyHTTP.prototype.get = function(url, callback) {
  this.http.open('GET', url, true);

  this.http.onload = function() {
    if (this.status === 200) {
      callback('GET', null, this.responseText, this.status);
    } else {
      callback(`Error: ${this.status}`);
    }
  };

  this.http.send();
};

easyHTTP.prototype.post = function(url, data, callback) {
  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');

  this.http.onload = function() {
    console.log(this.status);

    callback('POST', null, this.responseText, this.status);
  };

  this.http.send(JSON.stringify(data));
};

easyHTTP.prototype.put = function(url, data, callback) {
  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');

  this.http.onload = function() {
    callback('PUT', null, this.responseText, this.status);
  };

  this.http.send(JSON.stringify(data));
};

easyHTTP.prototype.delete = function(url, callback) {
  this.http.open('DELETE', url, true);

  this.http.onload = function() {
    if (this.status === 200) {
      callback('DELETE', null, this.responseText, this.status);
    } else {
      callback(`Error: ${this.status}`);
    }
  };

  this.http.send();
};

easyHTTP.prototype.patch = function(url, dataPatch, callback) {
  this.http.open('PATCH', url, true);

  this.http.onload = function() {
    callback('PATCH', null, this.responseText, this.status);
  };

  this.http.send(JSON.stringify(dataPatch));
};
