const jwt = require('jsonwebtoken');



function generate_jwt(user, email, secret) {

    const secret_key = secret;

    const token = jwt.sign(
        {
            data: {user: user, email: email}
        },
        secret_key,
        {
            algorithm: 'HS256'
        }
    );
    return token
}


module.exports = {
    generate_jwt,
};