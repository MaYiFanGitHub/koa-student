// 数据库操作
var mysql = require('mysql');
var config = require('../common/config');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

module.exports = {
  // 查询
  query(sql, data) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release()
          reject(err);
        } else {
          connection.query(sql, data, function(error, results, fields) {
            if (error) {
              throw error;
            }
            resolve(results);
            connection.release()
          });
        }
      });
    });
  },

  insert(sql, data) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release()
          reject(err);
        } else {
          connection.query(sql, data, function(error, results, fields) {
            if (error) {
              throw error;
            }
            resolve(results);
            connection.release()
          });
        }
      });
    });
  },

  delete(sql, data) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release()
          reject(err);
        } else {
          connection.query(sql, data, function(error, results, fields) {
            if (error) {
              throw error;
            }
            resolve(results);
            connection.release()
          });
        }
      });
    });
  },

  update(sql, data) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release()
          reject(err);
        } else {
          connection.query(sql, data, function(error, results, fields) {
            if (error) {
              throw error;
            }
            resolve(results);
            connection.release()
          });
        }
      });
    });
  }
};
