import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { MAIN_COLOR } from "@frontend/utils/constants";
import { useRouter } from "next/router";

function LoginLogoutButton({}) {
    const { data: session } = useSession();
    const router = useRouter();

    function signOutRedirect() {
        signOut();
        router.push("/");
    }

    return (
        <Button
            backgroundColor={MAIN_COLOR}
            _hover={{ opacity: "90%" }}
            size="sm"
            color="white"
            onClick={() => (session ? signOutRedirect() : signIn())}>
            {session ? "Sign Out" : "Get Started Here"}
        </Button>
    );
}

export default LoginLogoutButton;
