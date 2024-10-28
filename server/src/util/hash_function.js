import bcrypt from 'bcrypt';


const saltRounds = 10;


const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt);
    return bcrypt.hashSync(password, salt);
};


const comparePassword = (plain, hashed) => {
    bcrypt.compareSync(plain, hashed);
}

export default {
    hashPassword,
    comparePassword
};