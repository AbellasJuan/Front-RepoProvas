import { Box, TextField } from "@mui/material"
import styled from 'styled-components';

export default function SignUp(){
    return (
        <>
            <Box component="form" sx={styles.form}>
                <Title> Bem-vindo! </Title>
                <TextField sx={styles.input} label="Email" variant="outlined"/>
                <TextField sx={styles.input} label="Password" variant="outlined"/>
            </Box>
        </>
    )
}

const Title = styled.div`
    color: #4b4b4b;
    font-size: 3em;
    margin-bottom: 1em;
`

const styles = {
    form:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        height: "100vh"
    },

    input:{width: "300px"},
}