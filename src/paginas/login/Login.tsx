import React, { ChangeEvent, useEffect }  from 'react';
import { useState } from "react";
import './Login.css';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from "../../models/UserLogin";
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';

function Login() {

    let history = useNavigate();
    const [token, setToken] = useLocalStorage('token');

    const [userLogin, setUserLogin] = useState<UserLogin> (
        
        {
            id: 0,
            usuario: '',  
            senha: '',   
            token: '',
         }
    )

         useEffect(() => {
             if (token !==""){
                 history ('/home')
             }
         }, [token])   

    
    
    function updatedModel (e: ChangeEvent<HTMLInputElement>) {

         setUserLogin ( {                       // Alteração de Dados
                ...userLogin,                   //Espalha os dados
                [e.target.name]: e.target.value
         } )
        }          
    

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        
        e.preventDefault();

        try {

            await login(`/usuarios/logar`, userLogin, setToken)
            alert("Usuário logado com sucesso")
      

            // const resposta = await api.post(`/usuarios/logar, userLogin`)
            // setToken(resposta.data.token)

            alert ('Usuário Logado Com Sucesso !')

        } catch (error) {
            alert ('Dados do Usuário Inconsistentes. Erro ao Logar !')
        }

    }


    return (




 
        <Grid container direction='row' justifyContent='center' alignItems='center'>

            <Grid alignItems='center' xs = {6}>
                
                <Box paddingX={20}>
                    
                    <form  onSubmit = {onSubmit} >

                        <Typography variant = 'h3' gutterBottom color = 'textPrimary' component = 'h3' align = 'center' className='textos1'>Entrar</Typography>
                        <TextField  value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField  value={userLogin.senha}   onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                       
                        <Box marginTop={2} textAlign='center'>
                            
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>    
                            
                        </Box>    

                    </form>
                    <Box  display= 'flex' justifyContent= 'center' marginTop={2}>
                        <Box marginRight={1}>
                            
                            <Typography variant='subtitle1' gutterBottom align='center'>Não Tem Uma Conta!?</Typography>
                        
                        </Box>

                        <Link to='/cadastroUsuario'>

                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Bora Cadastrar!?</Typography>

                        </Link>

                        

                    </Box> 
                </Box>
            
            </Grid>
                 
                <Grid xs={6} className = 'imagem'  >
                
                 </Grid>


        </Grid>




    );
}
export default Login;