var bus = new Vue();


Vue.component('my-component', {
    props: ['addressInfo'],
    template: '<div>This is user definition component.. <br/> <br/>' + 
    '<input type="text" id="addr1" ref="input" v-on:input="updateAddr1($event.target.value)"  v-bind:value="addressInfo.addr" /> ' +
    '<input type="text" id="addr2" ref="input" v-on:input="updateAddr2($event.target.value)" v-bind:value="addressInfo.addr2" /> ' +
    '</div>',
    data: function() {
     return {
         addr: 'oho'
     }
    },
    methods: {
        updateAddr1: function (value) {
            bus.$emit('updateAddr', value);
        },
        updateAddr2: function (value) {
            bus.$emit('updateAddr2', value);
        },
        updateAddr: function () {
            //this.$emit('change', evt);
            //alert('updated');
            //return addressInfo.addr + addressInfo.addr2;
            let addressInfo = {
                addr: document.querySelector("#addr1").value,
                addr2: document.querySelector("#addr2").value,
            };
            this.$emit('update:addressInfo', addressInfo);
        }
    }
  });

var mainVue = new Vue({
    el: '#app',
    data: {
      message: 'Parent view area',
      addressInfo: {
          addr: "Seoul Gangnam-Gu",
          addr2: "Samsung Buidling",
      },
      phone_number: '010-2112-1234'
    },
    methods: {
        getAddressInfo: function(param) {
            //this.$emit('change', evt);
            alert(param);
            //addressInfo.addr = param.addr;
            //addressInfo.addr2 = param.addr2;
        }
    }
  });

bus.$on('updateAddr', function (value) {
    mainVue.addressInfo.addr = value;
});

bus.$on('updateAddr2', function (value) {
    mainVue.addressInfo.addr2 = value;
});
