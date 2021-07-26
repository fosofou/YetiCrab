import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { ITransportForm } from "../intarfece";
import { Link, NavLink} from "react-router-dom";


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
        const atiHref = `https://ati.su/firms/${transport.ati}/info`
        return (
            <tr key = {transport.id}>
            <td>{transport.id}</td>
            <td> {transport.date}</td>
            <td>{transport.time}</td>
            <td> {transport.name_carrier}</td>
            <td>{transport.company}</td>
            <td> {transport.telephone}</td>
            <td> {transport.comment}</td>
            <td> <a target = '_blank' href = {atiHref}>Открыть</a></td>
            <td><i className="material-icons icon" onClick = {() => deleteTransport(transport.id)}>delete</i></td>
            <td><NavLink to = {`/transport-detail/${transport.id}`}><i className = 'material-icons icon' >edit</i></NavLink></td>
            </tr>
        )
    });
    return (
       
        <div className = 'mt-5'>
        <h2>Таблица с заявками</h2>
        <div>
            <h5 className="left-align">Фильтры</h5>
        </div>
        <table className = 'centered striped left-align'>
            <thead>
          <tr className = 'px2'>
              <th>Номер заявки</th>
              <th>Дата получения</th>
              <th>Время получения</th>
              <th>ФИО перевозчика</th>
              <th>Компания перевозчика</th>
              <th>Телефон перевозчика</th>
              <th>Комментарий</th>
              <th>Ссылка на ATI</th>
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