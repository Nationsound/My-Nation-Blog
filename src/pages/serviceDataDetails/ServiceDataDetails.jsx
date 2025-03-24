import React from 'react'
import './ServiceDataDetails.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { serviceDatas } from '../../dommyData/serviceData';
export default function ServiceDataDetails() {
    const { id } = useParams();
    const serviceDataDetail = serviceDatas.find((p) => p.id === parseInt(id));

    if (!serviceDataDetail) return <div>Service details not found</div>;
    return (
        <div>
            <div className='service-a'>
                <div className='service-b'>
                    <h1>Service</h1>
                </div>
                <div className='service-c'>
                    <Link to="/" className="service-c-home">Home</Link>
                    <h6>Service</h6>
                </div>
            </div>


            <div className="service">
                <h2 className='my-service'>{serviceDataDetail.title}</h2>
                <img src={serviceDataDetail.image} alt={serviceDataDetail.i} className="my-image" />
                <h5 className='my-service-categories'>{serviceDataDetail.categories}</h5>
                <p className='my-service-content'>{serviceDataDetail.content}</p>
            </div>
            <div className="header">
                <h2>My Nation Blog: News, Style and Entertainment</h2>
                <h6>News, style & Entertainment</h6>
            </div>
        </div>
    )
}
