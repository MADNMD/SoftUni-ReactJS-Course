import { useEffect, useState } from 'react';

import * as motoService from '../../services/motoService';
import { MotoItem } from './MotoItem';

export const Catalog = () => {

    const [motors, setMotors] = useState([]);

    useEffect(() => {
        motoService.getAllMoto()
            .then(allMotors => {
                setMotors(allMotors);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <>
            <h2>Available Motorcycles</h2>
            <section id="dashboard">
                {motors.length === 0
                    ? <h2 className="no-avaliable">No avaliable motorcycles yet.</h2>
                    : motors.map(motor => <MotoItem key={motor._id} moto={motor} />)
                }

            </section>
        </>
    )
}