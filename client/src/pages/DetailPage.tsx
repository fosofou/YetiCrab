import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";


export const DetailPage = () =>{

    const {request,loading} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const id =  Object.values(useParams())[0]

    const [form, setForm] = useState({
        id:'',
        date:'',
        name_carrier:'',
        telephone:'',
        comment:'',
    })
    
    useEffect(() =>{
        window.M.updateTextFields();
    }, [])

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


    const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
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
                        Обновить
                    </button>
                </div>
            </div>
        </div>
       
    )
}