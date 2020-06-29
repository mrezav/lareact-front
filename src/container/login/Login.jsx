import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            error : ''
        }
    }

    handleInputChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.id] : e.target.value,
            error : ''
        })
    }

    handleSubmit = () => {
        const {email, password} = this.state;
        // console.log('email : ', email);
        // console.log('password : ', password);
        if(email === null || email === ''){
            this.setState({
                error : 'Maaf email masih kosong!'
            })
        }else if(password === null || password === ''){
            this.setState({
                error : 'Maaf password masih kosong!'
            })
        }else{
            this.handleRequest().then(result => {
                localStorage.setItem('userData' , JSON.stringify(result.data));
                this.props.history.push('/');
            }).catch(msg => {
                this.setState({
                    error : msg 
                })
            });
        }
    }

    handleRequest = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
                // console.log("response : ", response);
                
                axios.post('http://127.0.0.1:8000/api/login', this.state)
                .then(res => {
                    resolve(res);
                })
                .catch(function(error){
                    let message = error.response.data.message;
                    reject(message)
                })
                // .catch( function(error) {
                //     if(error.response){
                //         console.log('data : ', error.response.data);
                //         console.log('status : ',error.response.status);
                //         console.log('headers : ',error.response.headers);
                //     }else if (error.request) {
                //         console.log('request : ', error.request);
                //     }else{
                //         console.log('Error', error.message);
                //     }
                // });
            });
        });
    }
    
    render(){
        return(
            <div>
                <div className="container">
                    <div className="card">
                        <div className="card-header">Login Form</div>
                        <div className="card-body">
                            <input className="input" onChange={this.handleInputChange} id="email" type="email" name="email" placeholder="Email"/>
                            <input className="input" onChange={this.handleInputChange} id="password" type="password" name="password" placeholder="Password"/>
                            <button onClick={this.handleSubmit}>Login</button>
                            <span className="error">{this.state.error}</span>
                        </div>
                        <div className="card-footer">
                            <a href="/register">Register</a>
                        </div>
                    </div>
                    <div className="myName">
                        by Muhammad Reza Vahlevi
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);