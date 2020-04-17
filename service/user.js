const db = require('../util/DB');

// 查询全部的角色
exports.selectAllUser = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, user_username, user_name, role_id } = params;
  let sql =
    'SELECT t_user.*,t_role.role_name from t_user LEFT JOIN t_role ON t_user.role_id=t_role.role_id where t_user.is_delete=0';
  let countSql =
    'SELECT count(*) as count from t_user LEFT JOIN t_role ON t_user.role_id=t_role.role_id where t_user.is_delete=0';
  if (user_username) {
    sql += ' and t_user.user_username like "%' + user_username + '%"';
    countSql += ' and t_user.user_username like "%' + user_username + '%"';
  }
  if (user_name) {
    sql += ' and t_user.user_name like "%' + user_name + '%"';
    countSql += ' and t_user.user_name like "%' + user_name + '%"';
  }
  if (role_id != -1) {
    sql += ' and t_user.role_id = ' + role_id;
    countSql += ' and t_user.role_id = ' + role_id;
  }

  sql +=
    ' limit ' + ((currentPage - 1) * pageSize) + ',' + pageSize;
    console.log(sql)
  const result = await db.query(sql);
  const countResult = await db.query(countSql);

  ctx.success({
    userList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
};

// 添加用户
exports.addUser = async ctx => {
  let obj = ctx.request.body;
  let sql = 'insert into t_user set ?';
  delete obj.user_id;
  await db.insert(sql, obj);
  ctx.success();
};

// 添加多条用户
exports.addMoreUser = async ctx => {
  let obj = ctx.request.body;
  let userList = obj.map(user => {
    delete user.user_id;
    return Object.values(user);
  });
  var sql =
    'INSERT INTO t_user (user_username, user_password, role_id, user_name, user_sex, user_age, user_address, user_nation, user_tel, user_birthday, user_last_name, user_heath, user_culture) VALUES ?';
  await db.insert(sql, [userList]);
  ctx.success();
};

// 删除用户
exports.removeUser = async ctx => {
  let params = ctx.query;
  console.log('params = ', params);
  let sql = 'update t_user set is_delete = 1 where user_username = ?';
  await db.delete(sql, [params.user_username]);
  ctx.success();
};

// 更新用户
exports.editUser = async ctx => {
  let params = ctx.request.body;
  let sql = 'update t_user set user_culture = ?, role_id = ?, user_name = ?, user_last_name = ?, user_sex = ?, user_age = ?, user_nation = ?, user_tel = ?, user_birthday = ?, user_address = ?, user_heath = ?  where user_username = ?';
  await db.update(sql, [params.user_culture, params.role_id, params.user_name, params.user_last_name, params.user_sex, params.user_age, params.user_nation, params.user_tel, params.user_birthday, params.user_address, params.user_heath, params.user_username]);
  ctx.success();
};

// 查询院长身份的用户
exports.findDeanUser = async ctx => {
  let sql = 'select * from t_user where role_id in (select role_id from t_role where role_name = "院长")'
  const result = await db.query(sql)
  ctx.success(result)
}