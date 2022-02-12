import {Box, Container, List, ListItem, useDisclosure} from '@chakra-ui/react';

interface appProps {
    sessionId: Number,
}
//@todo create list data handler
//@todo connect edit function
//@todo make the user disappear from the list once confirmed -> seems it need to be handled by edit
const ApproveUsers = ({ sessionId }: appProps) => {
    return (
        <Box>
            <Container>
                <List spacing={10}>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                    <ListItem>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </ListItem>
                </List>
            </Container>
        </Box>
    );
};

export default ApproveUsers;