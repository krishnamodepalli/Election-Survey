
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// a UserAccountSchema
const UserAccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// There will be no registering, this is confidential to only the admins
UserAccountSchema.statics.login = function(username, password) {
  // check if the user exists
  const user = this.findOne({ username });
  if (!user)
    // if user not found
    throw new Error('User doesn\'t exist.');

  // now check if the password is correct
  bcrypt.compare(password, user.password).then(user => {
    console.log(user);
  });
};

UserAccountSchema.statics.createAdmin = async function(username, password) {
  const salt = await bcrypt.genSalt(10);
  const hash_passwd = bcrypt.hashSync(password, salt);

  this.create({ username, password: hash_passwd });
};

UserAccountSchema.static('findUser', async function(username) {
  const user = await this.findOne({ username });
  if (!user)
    return undefined;
  return user;
});


UserAccountSchema.method('changePassword', async function(oldPassword, newPassword) {
  if (! await bcrypt.compare(oldPassword, this.password))
    throw new Error('Password is incorrect');

  let salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hashSync(newPassword, salt);
  this.save();
});

UserAccountSchema.method('checkPassword', async function(password) {
  return await bcrypt.compare(password, this.password);
});

module.exports = model('userAccounts', UserAccountSchema);
