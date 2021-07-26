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
        time:'',
        company:'',
        name_carrier:'',
        telephone:'',
        comment:'',
        ati:''
    })

    const changeHandler = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
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
                        placeholder="Номер заявки*" 
                        id="id" 
                        type="text" 
                        name = 'id'
                        value = {form.id}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="id">Номер заявки</label>
            </div>
            <div className="input-field col s3 ">
                    <input 
                        id="date" 
                        type="date" 
                        name = 'date'
                        value = { form.date}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="date">Введите дату поступления заявки*</label>
            </div>
            <div className="input-field col s3 ">
                    <input 
                        id="time" 
                        type="time" 
                        name = 'time'
                        value = { form.time}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="time">Время</label>
            </div>
        </div>
         <div className = 'row'>
        <div className="input-field col s4 ">
                    <input 
                        placeholder="ФИО перевозчика*" 
                        id="name_carrier" 
                        type="text" 
                        name = 'name_carrier'
                        value = {form.name_carrier}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="name_carrierd">ФИО перевозчика*</label>
            </div> 

            <div className="input-field col s5 ">
                    <input 
                        placeholder="Компания перевозчика*" 
                        id="company" 
                        type="text" 
                        name = 'company'
                        value = {form.company}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="company">Компания перевозчика*</label>
            </div>

             <div className="input-field col s3 ">
                    <input 
                        placeholder="Телефон +7XXXXXXXXXX" 
                        id="telephone" 
                        type="tel"
                        pattern="+7[0-9]{10}"
                        name = 'telephone'
                        required
                        value = {form.telephone}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="telephone">Телефон*</label>
            </div>
           
        </div>

        <div className = 'row ml-2'>
        <form className="col s12">
        <div className="input-field col s12 ">
          <textarea  
            className="materialize-textarea"
            placeholder="Комментарий" 
            id="comment"
            name = 'comment'
            value = {form.comment}
            onChange = {changeHandler}
            />
           <label htmlFor="comment">Комментарий</label>
        </div> 
        </form>
        </div>

        <div className = 'row'>
        <div className="input-field col s4 ">
            <input 
                placeholder="ati*" 
                id="ati" 
                type="text" 
                name = 'ati'
                value = {form.ati}
                onChange = {changeHandler}
            />
            <label htmlFor="ati">ATI код*</label>
        </div> 
        </div>
        <div className="card-action right-align">
                    <button 
                        className = 'btn yellow darken-4'
                        disabled = {loading}
                        onClick = {onSubmit}
                    >
                        Добавить перевозку
                    </button>
                </div>
    
            
        </div>
       
    )
}