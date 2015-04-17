
var OLED = {
    service: "2C820001-3655-02AE-6848-7CC1F061A701",
    data: "2C820002-3655-02AE-6848-7CC1F061A701"
};
var deviceID;


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
//        document.addEventListener('touchstart', this.refreshDeviceList, false);
        document.getElementById("smile").addEventListener('touchstart',this.connect, false);
        document.body.addEventListener('touchstart', function(){
//                                       console.log(event.target);
                                       }, false);
        document.addEventListener('ratingChange', this.connect, false);
        // document.addEventListener('fridgeChange', this.connect, false);
        // document.addEventListener('rollChange', this.connect, false);
        // document.addEventListener('brushChange', this.connect, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.refreshDeviceList();
        FastClick.attach(document.body);
    },
    
    refreshDeviceList: function(){
        console.log("is this happening");
        ble.scan([], 5, app.onDiscoverDevice, app.onError);
    },

    onDiscoverDevice: function(device) {
        if (device.advertising.kCBAdvDataLocalName.match(/BLEOLED/i)) {
            console.log("Device Found");
            var listItem = document.createElement('li'),
            html = '<b>DEVICE SYNCED</br>'
            deviceID = device.id;
            listItem.dataset.deviceId = device.id;  // TODO
            listItem.innerHTML = html;
            productivity.appendChild(listItem);
            console.log(device.name + "has been found!");
//           alert(device.name + "has been found!");
        }
    },
    connect: function(e) {
//        console.log("is this happening?");
        var deviceId = deviceID,
        onConnect = function() {
            var configData = new Uint8Array(1);
            console.log("mData.score: " +  mData.score);
            ///this is where I can send the face change
            if (mData.score>5){
                configData[0] = 0x01;
            }else{
                console.log("score less than 5");
                configData[0] = 0x00;
            }
            ble.write(deviceId, OLED.service, OLED.data,configData.buffer,
                      function() { console.log("Logged Sad Face."); },app.onError);
        };
    
    ble.connect(deviceId, onConnect, app.onError);
},

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    
    onError: function(reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    }
};

app.initialize();