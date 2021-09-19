export const startCtrl = async (req, res) => {
  res.json({
    apiName: "Jesus Christian Castillo Lozano-API rest ejercicio para PERTI",
    routes: {
      SignUp: {
        routeProtected: false,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/auth/signup",
        method: "POST",
        bodyParams: {
          email: "pedro@gmail.com",
          firstName: "jesus",
          lastName: "Castillo",
          password: "123456",
          confirmPassword: "123456",
          role: "ROLE_ADMIN",
        },
        headers: {
          key: "Content-type",
          value: "application/json",
        },
        response: "User created",
      },
      Login: {
        routeProtected: false,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/user/login",
        method: "POST",
        bodyParams: {
          email: "pedro@gmail.com",
          password: "123456",
        },
        headers: {
          key: "Content-type",
          value: "application/json",
        },

        response: "Token for a new sesion",
      },
      GetAllUsers: {
        routeProtected: true,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/user",
        method: "GET",
        headers: [
          {
            key: "Content-type",
            value: "application/json",
          },
          {
            key: "x-auth-token",
            value: "token",
          },
        ],

        response: "All user in DB",
      },
      AddMovie: {
        routeProtected: true,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/movies/add",
        method: "POST",
        bodyParams: {
          title: "minions",
          year: "2021",
          runtime: "190min",
        },
        headers: [
          {
            key: "Content-type",
            value: "application/json",
          },
          {
            key: "x-auth-token",
            value: "token",
          },
        ],
        response: "Success or error ",
      },
      SearchMovie: {
        routeProtected: true,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/movies/?title=minions",
        method: "GET",
        queryParams: {
          title: "minions",
        },
        headers: [
          {
            key: "Content-type",
            value: "application/json",
          },
          {
            key: "x-auth-token",
            value: "token",
          },
        ],
        response: "Movie or don´t match title",
      },
      UpdateMovie: {
        routeProtected: true,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/movies/update/:id",
        method: "PUT",
        params: {
          id: "",
        },
        bodyParams: {
          title: "minions",
          year: "2021",
          runtime: "190min",
        },
        headers: [
          {
            key: "Content-type",
            value: "application/json",
          },
          {
            key: "x-auth-token",
            value: "token",
          },
        ],
        response: "Success or error ",
      },
      DeleteMovie: {
        routeProtected: true,
        uri: "http://app-95dd171d-8b3f-4531-acfa-146935c2e464.cleverapps.io/api/movies/delete/:id",
        method: "DELETE",
        params: {
          id: "",
        },
        headers: [
          {
            key: "Content-type",
            value: "application/json",
          },
          {
            key: "x-auth-token",
            value: "token",
          },
        ],
        response: "Success or error ",
      },
    },
  });
};
