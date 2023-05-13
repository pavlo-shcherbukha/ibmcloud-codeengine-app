const apperror = require('../error/appError');

class CustomerService {
    constructor(xtype) {
      this.typereq=xtype
      this.CustList=[
        {"cif": "100000001", "name": "Agap Aziz Maziz", "phone": "380502223344", "accounts":[]},
        {"cif": "100000002", "name": "Kozak Mamay", "phone": "380502223355", "accounts":[]},
        {"cif": "100000003", "name": "Viktor Viktorovich", "phone": "380502223366", "accounts":[]}
      ];
    }

    log (msg, label){
      if( typeof label === "undefined" || label === null || label === ''){
          label = 'CustomerService' 
      }
      let dtm = Date.now();
      let dt= new Date(dtm)
      let dtms=dt.toISOString()
      let logmsg={"timestamp": dtms, "message": msg, "label": label}
      console.log( JSON.stringify(logmsg)  )
    }

    /**
     * Знайти сервіс в масиві зреєсрованих сервісів
     * @param {*} service_list 
     * @param {*} service_id 
     * @returns 
     */
    findarr( service_list, service_key ,service_id ){
      return new Promise(function (resolve) {
          return resolve( service_list.findIndex( (item ) => { 
                            //console.log(  '1 ' + service_id);
                            //console.log(  JSON.stringify(item));    
                            //item.service_name === service_id 
                            if (item[service_key].localeCompare(service_id ) === 0){
                                return true;
                            }
                          }) )
      });
    } //findbyphone

    /**
     *  пошук за телефоном
     */
    async findbyphone(a_phone) {
      let label="CustomerSrvc.findbyphone";
      let logmsg="";
      let rres={};
      logmsg="Start"
      this.log(logmsg, label);
      logmsg="check existance of phone number"
      this.log(logmsg, label);
      try{
          if (typeof a_phone === "undefined"){
              logmsg="check existance of phone number: phone is  not defined"
              this.log(logmsg, label);
              throw new apperror.ApplicationError( logmsg );
          }
          let resultidx = await  this.findarr( this.CustList,"phone", a_phone );
          
          if (resultidx < 0 ){
            logmsg=`Customer does not foudn by pthone ${a_phone}`
            this.log(logmsg, label);
            rres={}  
            return rres;
          }
          logmsg=`Customer found pthone ${a_phone}`
          this.log(logmsg, label);
          logmsg="Customer: " + JSON.stringify(this.CustList[resultidx])
          this.log(logmsg, label);
          rres=this.CustList[resultidx]
          return rres;
      } catch (err){
        logmsg=err.message
        this.log(logmsg, label);
        throw new apperror.ApplicationError(err.message);
      }  

    } // end findbyphone

    /**
     *  пошук за cif
     */
    async findbycif(a_cif) {
      let label="CustomerSrvc.findbycif";
      let logmsg="";
      let rres={};
      logmsg="Start"
      this.log(logmsg, label);
      logmsg="check existance of cif number"
      this.log(logmsg, label);
      try{
          if (typeof a_cif === "undefined"){
              logmsg="check existance of cif:cif is  not defined"
              this.log(logmsg, label);
              throw new apperror.ApplicationError( logmsg );
          }
          let resultidx = await  this.findarr( this.CustList,"cif", a_cif );
          
          if (resultidx < 0 ){
            logmsg=`Customer does not foudn by cif ${a_cif}`
            this.log(logmsg, label);
            rres={}  
            return rres;
          }
          logmsg=`Customer found cif ${a_cif}`
          this.log(logmsg, label);
          logmsg="Customer: " + JSON.stringify(this.CustList[resultidx])
          this.log(logmsg, label);
          rres=this.CustList[resultidx]
          return rres;
      } catch (err){
        logmsg=err.message
        this.log(logmsg, label);
        throw new apperror.ApplicationError(err.message);
      }  

    } // end find by cif
 


} // end class def


module.exports = {
  CustomerService
  
};
    










