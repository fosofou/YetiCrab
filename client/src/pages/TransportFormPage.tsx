import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useMessage } from "../hooks/message.hook";





export const TransportFormPage = () =>{

    const history = useHistory();
    const auth = useContext(AuthContext)
    const {loading, request,error, clearError} = useHttp()
    const message = useMessage();
    

    useEffect(()=>{

        message(error);
        clearError()

    }, [error,message,clearError])

    useEffect(() =>{
        window.M.updateTextFields();
    }, [])

    const [form, setForm] = useState({
        id:'',
        date:'',
        name_carrier:'',
        telephone:'',
        comment:'',
    })

    const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const onSubmit = async (event:React.MouseEvent) =>{
        try{

            const data = await request('/api/transport/generate', 'POST', {...form},{
                Authorization:`Bearer ${auth.token}`
            });

            history.push('/')

        } catch (e) {

        }
    }

    return (
        <div className = 'mt-5'>
        <div className = 'row mt-2'> 
            <div className="input-field col s6 ">
                    <input 
                        placeholder="Номер заявки" 
                        id="id" 
                        type="text" 
                        name = 'id'
                        value = {form.id}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="id">Номер заявки</label>
            </div>
            <div className="input-field col s6 ">
                    <input 
                        id="date" 
                        type="date" 
                        name = 'date'
                        value = { form.date}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="date">Введите дату</label>
            </div>
        </div>
         <div className = 'row'>
        <div className="input-field col s3 ">
                    <input 
                        placeholder="Компания клиента" 
                        id="name_carrier" 
                        type="text" 
                        name = 'name_carrier'
                        value = {form.name_carrier}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="name_carrierd">Компания клиента</label>
            </div> 
             <div className="input-field col s3 ">
                    <input 
                        placeholder="Телефон" 
                        id="telephone" 
                        type="tel" 
                        name = 'telephone'
                        value = {form.telephone}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="telephone">Телефон</label>
            </div>
            <div className="input-field col s3 ">
                    <input 
                        placeholder="Комментарий" 
                        id="comment" 
                        type="text" 
                        name = 'comment'
                        value = {form.comment}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="comment">Комментарий</label>
            </div> 
        
          
            <div className="card-action">
                    <button 
                        className = 'btn yellow darken-4'
                        disabled = {loading}
                        onClick = {onSubmit}
                    >
                        Добавить перевозку
                    </button>
                </div>
            </div>
        </div>
       
    )
}