const Users = require('../../model/v1/users');

exports.searchUsers = async (req, res) => {
  const { data } = req.params;

  try {
    const users = await Users.find({ name: { $regex: data, $options: 'i' } });
    return res.json({
      error: false,
      message: 'Users found',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: 'Oops, something went worng',
    });
  }
};
