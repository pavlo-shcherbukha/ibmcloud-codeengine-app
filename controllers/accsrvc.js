const apperror = require('../error/appError');

class AccountService {
    constructor(xtype) {
      this.typereq=xtype
      this.AccList=[
        {"cif": "100000001",  "account": "26201001", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        {"cif": "100000001",  "account": "26201002", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        {"cif": "100000001",  "account": "26201003", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        
        {"cif": "100000002",  "account": "26201021", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        {"cif": "100000002",  "account": "26201022", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        {"cif": "100000002",  "account": "26201023", "balin": 0, "dbt":0, "krd": 0, "balout":0},

        {"cif": "100000003",  "account": "26201031", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        {"cif": "100000003",  "account": "26201032", "balin": 0, "dbt":0, "krd": 0, "balout":0},
        {"cif": "100000003",  "account": "26201033", "balin": 0, "dbt":0, "krd": 0, "balout":0}

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
     *  Read account list
     */
    async accountlist() {
      let label="AccountSrvc.accountlist";
      let logmsg="";
      let rres={};
      logmsg="Start";
      this.log(logmsg, label);
      try{
          logmsg=`Return accits list`;
          this.log(logmsg, label);
          logmsg="Accounts list: " + JSON.stringify(this.AccList);
          this.log(logmsg, label);
          rres=this.AccList;
          return rres;
      } catch (err){
        logmsg=err.message;
        this.log(logmsg, label);
        throw new apperror.ApplicationError(err.message);
      }  

    } // end 

    async readaccount(a_account) {
        let label="AccountSrvc.account";
        let logmsg="";
        let rres={};
        logmsg="Start";
        this.log(logmsg, label);
        try{
            if (typeof a_account === "undefined"){
                logmsg="check existance of account: account is  not defined"
                this.log(logmsg, label);
                throw new apperror.ApplicationError( logmsg );
            }
            let resultidx = await  this.findarr( this.AccList,"account", a_account );
            
            if (resultidx < 0 ){
              logmsg=`account does not found. account= ${a_account}`
              this.log(logmsg, label);
              rres={}  
              return rres;
            }
            logmsg=`account found: ${a_account}`
            this.log(logmsg, label);
            logmsg="Acount: " + JSON.stringify(this.AccList[resultidx])
            this.log(logmsg, label);
            rres=this.AccList[resultidx]
            return rres;
        } catch (err){
          logmsg=err.message;
          this.log(logmsg, label);
          throw new apperror.ApplicationError(err.message);
        }  
  
    } // end 
  

  
    } // end 


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
  AccountService
  
};
    










