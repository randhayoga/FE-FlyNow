import Register from "@/components/Register";
import RegisterBg from "../assets/images/register-bg.svg";

const RegisterPage = () => {
    return (
        <div className="dark:bg-background dark:text-muted-foreground flex h-screen w-screen items-center justify-center">
            <div>
                <img src={RegisterBg} alt="Register Image" />
                <h1>Ini adalah Register page</h1>
            </div>
            <Register />
        </div>
    );
};

export default RegisterPage;
