import Login from "@/components/Login";
import LoginBg from "../assets/images/login-bg.svg";

const LoginPage = () => {
    return (
        <div className="dark:bg-background dark:text-muted-foreground flex h-screen w-screen items-center justify-center">
            <div>
                <img src={LoginBg} alt="Login Image" />
                <h1>Ini adalah Login page</h1>
            </div>
            <Login />
        </div>
    );
};

export default LoginPage;
