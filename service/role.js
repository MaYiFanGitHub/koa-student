const db = require('../util/DB')

// 查询全部的角色
exports.selectAllRole = async (ctx) => {
  const result = await db.query('select * from t_role where is_delete = 0')
  ctx.success(result)
}

// 添加角色
exports.addRole = async (ctx) => {
  let obj = ctx.request.body;
  console.log(obj)
  let sql = 'insert into t_role set ?';
  delete obj.role_id
  await db.insert(sql, obj)
  ctx.success()
}

// 删除角色
exports.removeRole = async (ctx) => {
  let params = ctx.query;
  console.log('params = ', params)
  let sql = 'update t_role set is_delete = 1 where role_id = ?';
  await db.delete(sql, [params.role_id])
  ctx.success()
}

// 更新角色
exports.editRole = async (ctx) => {
  let params = ctx.request.body;
  let sql = 'update t_role set role_name = ?, role_rank = ? where role_id = ?';
  await db.update(sql, [params.role_name, params.role_rank, params.role_id])
  ctx.success()
}