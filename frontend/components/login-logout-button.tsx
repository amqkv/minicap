import { Button } from '@chakra-ui/react'
import {useSession ,signIn, signOut} from 'next-auth/react';


function LoginLogoutButton({}){
  const { data: session } = useSession();

 return <Button colorScheme='pink' size='xs'onClick={() => session ? signOut() : signIn()}>{session ? "Sign Out": "Get Started Here"}</Button>
}


export default LoginLogoutButton
