const db = require('../util/DB');

// 查询全部的角色
exports.selectAllUser = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, user_username, user_name, role_id } = params;
  let sql =
    'SELECT t_user.*, t_role.role_name, t_teacher_info.teacher_title,t_student_info.politics_status_id,t_politics_status.politics_status,t_student_info.class_id, t_class.class_name, t_specialty.specialty, t_specialty.specialty_name, t_college.college_id as student_college_id, t_college.college_name from t_user LEFT JOIN t_role ON t_user.role_id=t_role.role_id LEFT JOIN t_student_info ON t_user.user_id=t_student_info.user_id LEFT JOIN t_teacher_info ON t_user.user_id=t_teacher_info.user_id LEFT JOIN t_class ON t_student_info.class_id=t_class.class_id LEFT JOIN t_specialty ON t_class.specialty=t_specialty.specialty LEFT JOIN t_college ON t_college.college_id=t_specialty.college_id LEFT JOIN t_politics_status ON t_student_info.politics_status_id=t_politics_status.politics_status_id where t_user.is_delete=0 and t_user.college_id = ' + ctx.session.userInfo.college_id + ' ';
  let countSql =
    'SELECT count(*) as count from t_user LEFT JOIN t_role ON t_user.role_id=t_role.role_id LEFT JOIN t_student_info ON t_user.user_id=t_student_info.user_id LEFT JOIN t_teacher_info ON t_user.user_id=t_teacher_info.user_id LEFT JOIN t_class ON t_student_info.class_id=t_class.class_id LEFT JOIN t_specialty ON t_class.specialty=t_specialty.specialty LEFT JOIN t_college ON t_college.college_id=t_specialty.college_id LEFT JOIN t_politics_status ON t_student_info.politics_status_id=t_politics_status.politics_status_id where t_user.is_delete=0 and t_user.college_id = ' + ctx.session.userInfo.college_id + ' ';
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
  } else if (role_id == -1) {
    let flagId = ctx.session.userInfo.role_id
    /* 
      AND (t_user.college_id = 20 AND t_user.role_id = 2)
      OR (t_user.college_id = 20 AND t_user.role_id = 3)
    */
    if (flagId === 0) {
      sql += ' and (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 0) or (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 1)';
      countSql += ' and (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 0) or (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 1)';
    } else if (flagId === 1) {
      sql += ' and t_user.role_id = 4 ';
      countSql += ' and t_user.role_id = 4 ';
    } else if (flagId === 4) {
      sql += ' and (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 2) or (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 3)';
      countSql += ' and (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 2) or (t_user.college_id = '+ctx.session.userInfo.college_id+' AND t_user.role_id = 3)';
    }
  }

  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;

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
  let teacher_title = obj.teacher_title
  let role_id = obj.role_id
  let politics_status_id = obj.politics_status_id
  let class_id = obj.class_id
  
  delete obj.user_id;
  delete obj.teacher_title;
  delete obj.politics_status_id;
  delete obj.specialty;
  delete obj.college_id;
  delete obj.class_id;

  // 用户表中插入
  let sql = 'insert into t_user set ?';
  // 添加的用户不为管理，要填入 学院id
  if (role_id !== 0) {
    obj.college_id = ctx.session.userInfo.college_id
  }
  let res = await db.insert(sql, obj);
  
  if (role_id === 2 || role_id === 4) { // 添加教秘/教师身份
    let teacherObj= {
      teacher_id: parseInt(
        Date.now() + parseInt(Math.random() * 10000, 10) + 1
      )
        .toString()
        .substr(6, 12),
      user_id: res.insertId,
      college_id: ctx.session.userInfo.college_id,
      teacher_title
    }
    let teacherSql = 'insert into t_teacher_info set ?'
    await db.insert(teacherSql, teacherObj);

    let updateUserSql = 'update t_user set teacher_id = ? where user_id = ?'
    await db.update(updateUserSql, [teacherObj.teacher_id, res.insertId])
  } else if (role_id === 3) { // 添加学生
    let studentObj = {
      student_id: parseInt(
        Date.now() + parseInt(Math.random() * 10000, 10) + 1
      )
        .toString()
        .substr(6, 12),
      user_id: res.insertId,
      politics_status_id,
      class_id
    }
    console.log(studentObj)
    let studentSql = 'insert into t_student_info set ?'
    await db.insert(studentSql, studentObj);

    let updateUserSql = 'update t_user set student_id = ? where user_id = ?'
    await db.update(updateUserSql, [studentObj.student_id, res.insertId])
  }
  ctx.success({});
};

// 添加多条用户
exports.addMoreUser = async ctx => {
  let obj = ctx.request.body;
  let userList = obj.map(user => {
    user.user_id = parseInt(
      Date.now() + parseInt(Math.random() * 10000, 10) + 1
    )
      .toString()
      .substr(6, 12);
    return Object.values(user);
  });
  console.log(userList);
  var sql =
    'INSERT INTO t_user (user_username, user_password, role_id, user_name, user_sex, user_age, user_address, user_nation, user_tel, user_birthday, user_last_name, user_heath, user_culture, user_id) VALUES ?';
  await db.insert(sql, [userList]);
  ctx.success();
};

// 添加多条教师或者教秘用户
exports.addMoreTeacher = async ctx => {
  let obj = ctx.request.body;
  let user_ids = [];
  let teacher_titles = [];
  let userList = obj.map(user => {
    teacher_titles.push(user.teacher_title);
    delete user.teacher_title;
    user.user_id = parseInt(
      Date.now() + parseInt(Math.random() * 10000, 10) + 1
    )
      .toString()
      .substr(6, 12);
    user_ids.push(user.user_id);
    user.college_id = ctx.session.userInfo.college_id
    return Object.values(user);
  });
  console.log(userList)
  var sql =
    'INSERT INTO t_user (user_username, user_password, role_id, user_name, user_sex, user_age, user_address, user_nation, user_tel, user_birthday, user_last_name, user_heath, user_culture, user_id, college_id) VALUES ?';
  await db.insert(sql, [userList]);
  console.log(1)
  let userList1 = obj.map(user => {
    user.user_id = user_ids.pop();
    user.teacher_id = parseInt(
      Date.now() + parseInt(Math.random() * 10000, 10) + 1
    )
      .toString()
      .substr(6, 12);
    return [user.teacher_id, user.user_id, teacher_titles.pop(), ctx.session.userInfo.college_id];
  });
  console.log(userList1);
  var sql1 =
    'insert into t_teacher_info (teacher_id, user_id, teacher_title, college_id) values ?';
  await db.insert(sql1, [userList1]);

  // 回填用户表
  userList1.forEach(async item => {
    let updateSql = 'update t_user set teacher_id = ? where user_id = ?'
    await db.update(updateSql, [item[0], item[1]])
  })
  ctx.success();
};

// 添加多条学生用户
exports.addMoreStudent = async ctx => {
  let obj = ctx.request.body;
  
  let user_ids = [];
  let class_ids = [];
  let politics_status_ids = [];
  
  let userList = obj.map(user => {
    class_ids.push(user.class_id);
    politics_status_ids.push(user.politics_status_id);

    delete user.class_id;
    delete user.politics_status_id;
    delete user.college_id;
    delete user.specialty;

    user.user_id = parseInt(
      Date.now() + parseInt(Math.random() * 10000, 10) + 1
    )
      .toString()
      .substr(6, 12);
    user.college_id = ctx.session.userInfo.college_id
    user_ids.push(user.user_id);
    return Object.values(user);
  });
  // console.log(userList)
  var sql =
    'INSERT INTO t_user (user_username, user_password, role_id, user_name, user_sex, user_age, user_address, user_nation, user_tel, user_birthday, user_last_name, user_heath, user_culture, user_id, college_id) VALUES ?';
  await db.insert(sql, [userList]);
  
  let userList1 = obj.map(user => {
    user.user_id = user_ids.pop();
    user.student_id = parseInt(
      Date.now() + parseInt(Math.random() * 10000, 10) + 1
    )
      .toString()
      .substr(6, 12);
    return [user.student_id, user.user_id, politics_status_ids.pop(), class_ids.pop()];
  });
  console.log(userList1);
  var sql1 =
    'insert into t_student_info (student_id, user_id, politics_status_id, class_id) values ?';
  await db.insert(sql1, [userList1]);

  // 回填用户表
  userList1.forEach(async item => {
    let updateSql = 'update t_user set student_id = ? where user_id = ?'
    await db.update(updateSql, [item[0], item[1]])
  })
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
  let sql =
    'update t_user set user_culture = ?, role_id = ?, user_name = ?, user_last_name = ?, user_sex = ?, user_age = ?, user_nation = ?, user_tel = ?, user_birthday = ?, user_address = ?, user_heath = ?  where user_id = ?';
  await db.update(sql, [
    params.user_culture,
    params.role_id,
    params.user_name,
    params.user_last_name,
    params.user_sex,
    params.user_age,
    params.user_nation,
    params.user_tel,
    params.user_birthday,
    params.user_address,
    params.user_heath,
    params.user_id
  ]);

  if (params.role_id == 2 || params.role_id == 4) { // 修改教师表
    let teacherSql = 'update t_teacher_info set teacher_title = ? where user_id = ?'
    await db.update(teacherSql, [params.teacher_title, params.user_id])
  } else if (params.role_id == 3) { // 修改学生表
    let studentSql = 'update t_student_info set politics_status_id = ?, class_id = ? where user_id = ?'
    await db.update(studentSql, [params.politics_status_id, params.class_id, params.user_id])
  }
  ctx.success();
};

// 查询院长身份的用户
exports.findDeanUser = async ctx => {
  let sql =
    'select * from t_user where role_id in (select role_id from t_role where role_name = "院长") and is_delete=0 and t_user.college_id is null';
  const result = await db.query(sql);
  ctx.success(result);
};

// 查询教师身份的用户
exports.findTeacherUser = async ctx => {
  let sql =
    'select t_user.user_name, t_teacher_info.teacher_id from t_user RIGHT JOIN t_teacher_info ON t_user.user_id = t_teacher_info.user_id where role_id in (select role_id from t_role where role_name = "教师") and t_user.college_id = ?';
  const result = await db.query(sql, [ctx.session.userInfo.college_id]);
  ctx.success(result);
};

// 登录
exports.login = async ctx => {
  let params = ctx.request.body;
  let sql =`
    SELECT
      t_role.*, t_user.user_id,
      t_user.role_id,
      t_user.user_name,
      t_user.user_username,
      t_user.college_id,
      t_teacher_info.teacher_id,
      t_student_info.student_id,
      t_student_info.politics_status_id,
      t_student_info.politics_status_info_id,
      t_student_info.class_id
    FROM
      t_user
    LEFT JOIN t_role ON t_user.role_id = t_role.role_id
    LEFT JOIN t_teacher_info ON t_user.user_id = t_teacher_info.user_id
    LEFT JOIN t_student_info ON t_user.user_id = t_student_info.user_id
    WHERE
      t_user.is_delete = 0
      AND t_user.user_username = ?
      AND t_user.user_password = ?
      AND t_user.role_id = ? 
    `
  const result = await db.query(sql, [
    params.user_username,
    params.user_password,
    params.role_id
  ]);
  console.log(params)
  console.log(sql)
  if (result.length === 0 && params.role_id === 2) {
    const result = await db.query(sql, [
      params.user_username,
      params.user_password,
      4
    ]);
    if (result.length !== 0) {
      // 存放session
      ctx.session.userInfo = result[0];
      ctx.success(result[0]);
    } else {
      ctx.fail();
    }
  } else if (result.length === 0) {
    ctx.fail();
  } else {
    // 存放session
    ctx.session.userInfo = result[0];
    ctx.success(result[0]);
  }
};
// 退出登录
exports.logout = async ctx => {
  ctx.session.userInfo = {};
  ctx.success();
};

// 查询政治面貌
exports.queryPolitics = async ctx => {
  let sql = 'select * from t_politics_status'
  let res = await db.query(sql)
  ctx.success(res)
}

// 修改密码
exports.updatePassword = async ctx => {
  let params = ctx.request.body;
  console.log(params)
  let sql = 'update t_user set user_password = ? where user_id = ?'
  await db.update(sql, [params.user_password, params.user_id])
  ctx.success()
}