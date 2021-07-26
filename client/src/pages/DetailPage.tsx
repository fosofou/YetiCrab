import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";


export const DetailPage = () =>{

    const {request,loading, error, clearError} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const id =  Object.values(useParams())[0]
    const message = useMessage()

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
    
    useEffect(() =>{
        window.M.updateTextFields();
    }, [])

    useEffect(()=>{

        message(error);
        clearError()

    }, [error,message,clearError])

    const findTransport = useCallback(async () =>{
        try{

            setForm(await request(`/api/transport/${id}`, 'GET', null ,{
                Authorization:`Bearer ${auth.token}`
            }));

        } catch (e) {}
    },[])

    useEffect(() =>{
        findTransport();
        
    }, [])


    const changeHandler = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const onSubmit = async (event:React.MouseEvent) =>{
        try{

            const data = await request(`/api/transport/${id}/update`, 'POST', {...form},{
                Authorization:`Bearer ${auth.token}`
            });
            console.log(data);
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
            <div className="input-field col s3 ">
                    <input 
                        id="date" 
                        type="date" 
                        name = 'date'
                        value = { form.date}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="date">Введите дату поступления заявки</label>
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
                        placeholder="ФИО перевозчика" 
                        id="name_carrier" 
                        type="text" 
                        name = 'name_carrier'
                        value = {form.name_carrier}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="name_carrierd">ФИО перевозчика</label>
            </div> 

            <div className="input-field col s5 ">
                    <input 
                        placeholder="Компания перевозчика" 
                        id="company" 
                        type="text" 
                        name = 'company'
                        value = {form.company}
                        onChange = {changeHandler}
                    />
                    <label htmlFor="company">Компания перевозчика</label>
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
                placeholder="ati" 
                id="ati" 
                type="text" 
                name = 'ati'
                value = {form.ati}
                onChange = {changeHandler}
            />
            <label htmlFor="ati">ATI код</label>
        </div> 
        </div>
        <div className = 'row'>
        <div className="card-action col ">
                    <button 
                        className = 'btn yellow darken-4'
                        disabled = {loading}
                        onClick = {onSubmit}
                    >
                        Обновить
                    </button>
                </div>
        <div className="card-action col "  style={{marginLeft: '2rem'}}>
            <button 
                className = 'btn yellow darken-4'
                disabled = {loading}
                onClick = {() => {history.push('/')}}
            >
                Отменить
            </button>
        </div>
        </div>     
        </div>
       
    )
}