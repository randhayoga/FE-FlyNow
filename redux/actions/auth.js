import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import { setToken, setUser } from "../reducers/auth";

export const login = (navigate, email, password) => async (dispatch) => {
    // make loading
    // setIsLoading(true);

    let data = JSON.stringify({
        email,
        password,
    });

    let config = {
        method: "post",
        url: `https://flynow-staging-dot-fsw2-binar-academy.et.r.appspot.com/api/auth/login`,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const response = await axios.request(config);

        // get and save the token to local storage
        const { data } = response.data;
        const { token, user } = data;

        // Change the token value in the reducer
        dispatch(setToken(token));
        dispatch(setUser(user));

        toast.success("Anda berhasil Login!");

        // redirect to home
        navigate("/"); // it will be not consistent, so alternative we use window until we used the state management
    } catch (error) {
        toast.error("Cek kembali email dan password anda");

        dispatch(logout());
    }

    // setIsLoading(false);
};

export const logout = () => (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
};