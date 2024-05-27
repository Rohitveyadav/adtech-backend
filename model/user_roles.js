const pgclient =  require('../db.config');

const createRoleDb =  async function(req,res){

const insertUserRoleQuery = `
  INSERT INTO user_role (role_type)
  VALUES ($1)
  RETURNING *;
`;

try {
    const { role } = req.body;
    const result = await pgclient.query(insertUserRoleQuery, [role]);
    res.status(201).send({
      message: "Role created successfully"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error inserting role",
      error: err.message
    });
  }

}

const getRoles =  async function(req,res){
    const selectUserTypesQuery = `SELECT * FROM user_role;`;
    try {
        const result = await pgclient.query(selectUserTypesQuery);
        res.status(200).send({
          data: result.rows
        });
      } catch (err) {
        console.error('Error retrieving user types', err);
        res.status(500).send({
          message: "Error retrieving user types",
          error: err.message
        });
      }   
}

module.exports = {createRoleDb,getRoles}