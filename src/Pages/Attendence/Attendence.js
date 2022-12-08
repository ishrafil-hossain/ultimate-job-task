
import React, { Fragment, useEffect, useState } from 'react'
import logo from "../../Assets//logo.png";
import Axios from '../../Axios/AxiosInstance';
import Global from "../../styles/Global.css";
import { Link } from 'react-router-dom';

const Attendence = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const attendence = [];
    const fetchData = async () => {
        const res = await Axios.get('/test', {
            headers: { Authorization: `bearer ${localStorage.getItem("access_Token")}` }
        });
        setData(res.data);
        setIsloading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    for (const info in data) {
        const fullInfo = data[info];
        attendence.push(fullInfo)
    }
    let content;
    if (isLoading) {
        content = <div className='loading' ></div>
    }
    else if (!isLoading && attendence.length) {
        content = <div className="container">
            <div className="logo">
                <Link to={"/attendence"}><img src={logo} alt="" /></Link>
            </div>
            <div className='attendence-table'>
                <h3 className='attendence-heading'>Attendence Information</h3>
                <table className='attendence-table'>
                    <colgroup>
                        <col style={{ width: "33%" }} />
                        <col style={{ width: "33%" }} />
                        <col style={{ width: "33%" }} />
                    </colgroup>
                    <thead className='thead'>
                        <th>Date</th>
                        <th>Employe Name</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            attendence.map(atd => {
                                const { name, attendance } = atd;
                                let status;
                                let dateStatus;
                                for (const date in attendance) {
                                    status = attendance[date].status;
                                    dateStatus = date;
                                }
                                return (
                                    <tr className='table-row'>
                                        <td>{dateStatus}</td>
                                        <td>{name}</td>
                                        <td>{status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default Attendence