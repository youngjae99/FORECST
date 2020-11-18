import React from 'react';
import {Div, Button} from 'atomize';

const CampPage = () =>{
    return (
        <div>
            Camp Page
            <Button
                h="2.5rem"
                p={{ x: "1rem" }}
                textSize="body"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                border="1px solid"
                borderColor="info700"
                hoverBorderColor="info900"
                m={{ r: "0.5rem" }}
            >
                Small
            </Button>
        </div>
    );
};

export default CampPage;