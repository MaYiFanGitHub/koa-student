const db = require('../util/DB')
module.exports = {
  queryAll(){
    return db.query('select * from t_role where is_delete = 0')
  },
  addRole(obj) {
    let sql = 'insert into t_role set ?';
    return  db.insert(sql, obj)
  }
}