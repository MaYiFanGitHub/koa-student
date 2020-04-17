const db = require('../util/DB');

// 查询全部的角色
exports.selectAllRole = async ctx => {
  const result = await db.query('select * from t_role where is_delete = 0');
  ctx.success(result);
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

// 删除角色
exports.removeRole = async ctx => {
  let params = ctx.query;
  console.log('params = ', params);
  let sql = 'update t_role set is_delete = 1 where role_id = ?';
  await db.delete(sql, [params.role_id]);
  ctx.success();
};

// 更新角色
exports.editRole = async ctx => {
  let params = ctx.request.body;
  let sql = 'update t_role set role_name = ?, role_rank = ? where role_id = ?';
  await db.update(sql, [params.role_name, params.role_rank, params.role_id]);
  ctx.success();
};
