

//mensagens de login

module.exports = {
    user: {
        //falta de data
        duplicate: {
          msg: "DuplicateValues",
          message: {
            eng: "Email already registered",
          },
          status: 409,
          success: false,
        },
    
        invalid: {
            msg: "Invalid",
            message: {
                eng:"Invalid Login",
            },
            status: 400,
            sucess: false
        },

        unauthorized: {
            msg: "Unauthorized",
            message: {
                eng:"You can not access to this route",
            },
            status: 401,
            sucess: false
        },

        email: {
            msg: "Invalid",
            message: {
                eng:"Email not Registered",
            },
            status: 400,
            sucess: false
        },

        password: {
            msg: "Invalid",
            message: {
                eng:"Invalid Password",
            },
            status: 400,
            sucess: false
        },

        signinSuccess: {
            msg: "Success",
            message: {
                eng:"Login with success",
            },
            status: 200,
            sucess: true
        },

        signupSuccess: {
            msg: "Signup Success",
            message: {
                eng:"Signup with success",
            },
            status: 200,
            sucess: true
        },

        logoutSuccess: {
            msg: "Logout Success",
            message: {
                eng:"Signup with success",
            },
            status: 200,
            sucess: true
        },

        logoutError: {
            msg: "Logout Error",
            message: {
                eng:"You cannot logout. There is no active session",
            },
            status: 503,
            sucess: true
        }
    },
};
