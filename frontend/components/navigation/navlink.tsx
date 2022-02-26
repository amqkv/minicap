import { Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import NextLink from "next/link";
import { MAIN_COLOR } from "@frontend/utils/constants";

interface NavLinkProps {
    children?: ReactNode;
    url: string;
    textDecoration?: boolean;
    styleProps?: Object;
}

const NavLink = ({ children, url, textDecoration, styleProps }: NavLinkProps) => {
    const hoverStyling = {
        textDecoration: textDecoration ? "underline" : "none",
        textDecorationColor: MAIN_COLOR,
    };

    return (
        <NextLink href={url}>
            <Link px={2} py={1} rounded={"md"} _hover={hoverStyling} {...styleProps}>
                {children}
            </Link>
        </NextLink>
    );
};

export default NavLink;
