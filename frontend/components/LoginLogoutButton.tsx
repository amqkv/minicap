import { Button } from '@chakra-ui/react'
import {useSession ,signIn, signOut} from 'next-auth/react';


function LoginLogoutButton({}){
  const { data: session } = useSession();

 return <Button colorScheme='blue' size='xs'onClick={() => session ? signOut() : signIn()}>{session ? "Sign out": "Sign in"}</Button>
}


export default LoginLogoutButton
