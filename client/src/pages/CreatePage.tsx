import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { ITransportForm } from "../intarfece";
import { NavLink} from "react-router-dom";


export const CreatePage = () =>{
    const {request} = useHttp()
    const auth = useContext(AuthContext);
    const [transportData, setTransportData] = useState<ITransportForm[]>([]);


    const loadTransportsList = useCallback(async () =>{
        
        let response = (await request('/api/transport/', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })); 
        setTransportData(response)
    }, [])

    const deleteTransport = async (id:string) =>{
        try{
            const response = await request(`/api/transport/${id}/delete`, 'POST', null, {
                Authorization: `Bearer ${auth.token}`
            });
            loadTransportsList();
        } catch (e) {
        }
    }


    useEffect(() =>{
        loadTransportsList();
    },[setTransportData])


    const render = transportData.map(transport =>{
        return (
            <tr key = {transport.id}>
            <td>{transport.id}</td>
            <td> {transport.date}</td>
            <td> {transport.name_carrier}</td>
            <td> {transport.telephone}</td>
            <td> {transport.comment}</td>
            <td><i className="material-icons icon" onClick = {() => deleteTransport(transport.id)}>delete</i></td>
            <td><NavLink to = {`/transport-detail/${transport.id}`}><i className = 'material-icons icon' >edit</i></NavLink></td>
            </tr>
        )
    });
    return (
       
        <div className = 'mt-5'>
        <h2>Таблица с заявками</h2>
        <h3>Фильтры</h3>
        <table className = 'centered striped'>
            <thead>
          <tr>
              <th>Номер заявки</th>
              <th>Дата получения</th>
              <th>Фирма клиента</th>
              <th>Телефон перевозчика</th>
              <th>Комментарий</th>
              <th></th>
          </tr>
            </thead>
            <tbody>
                {render}            
            </tbody>
        </table>
        
        </div>
    )
   
}